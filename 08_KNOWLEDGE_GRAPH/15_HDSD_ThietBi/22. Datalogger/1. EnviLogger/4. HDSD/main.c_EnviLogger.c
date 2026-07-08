#include "main.h"
#include "math.h"
#include "stdio.h"
#include <string.h>
#define INIT_SYSTEM			    100
#define ENTER_PASSWORD		    1
#define	CHECK_PASSWORD		    2
#define MATCH_PASSWORD_1        3
#define MATCH_PASSWORD_2        4
#define MATCH_PASSWORD_3        5
#define MATCH_PASSWORD_5        6
#define MATCH_PASSWORD_ADMIN    7
#define WRONG_PASSWORD		    8

void DisplayInOut(void);
volatile uint8_t sensorAlarm[20] = {0,0,0,0,0,0,0,0,0,0,
                                    0,0,0,0,0,0,0,0,0,0};

union Hex2Float
{
    float f;
    uint32_t hex4;
} hex2float;

uint16_t statusMain = INIT_SYSTEM;
unsigned char arrayPassword[6];
unsigned char indexOfNumber = 0;
uint16_t timeDelay = 0;

#define INIT_SYSTEM             100
#define ALARM_LIGHT             1
#define ALARM_BUZZER            2
#define WAIT_HANDLE             3
uint16_t statusAlarm = INIT_SYSTEM;
#define LIGHT_PIN       0
#define BUZZER_PIN      1
#define TIME_ALARM_LIGHT    1   //minute (Thoi gian sau bao lau thi bao ken va tu dong lay mau)

#define INIT_SYSTEM             100
#define CHECK_EMPTY_BOTTLE      1
#define FULL_BOTTLE             2
#define PUMP                    3
#define PUMP_1                  4
#define PUMP_2                  5
#define NO_WATER                6
#define MOVE_TURN               7
#define MOVE_TURN_1             8
#define MOVE_TURN_2             9
#define WAIT_PUMP               10
#define WAIT_MOVE_TURN          11
#define WAIT_AUTO_SAMPLER       12
uint16_t statusAutoSampler = INIT_SYSTEM;
uint32_t cntOfAutoSampler = 0;
uint8_t flagFinishAutoSampler = 0;
#define SAMPLER_MOVE        2
#define SAMPLER_PUMP        3
#define CHECK_PUMP          0
#define TIME_OUT_PUMP       5   //min (Thoi gian timeout khong co nuoc cua may lay mau)

#define NUMBER_OF_PUMP      1
uint8_t numberOfPump = 0;

volatile uint32_t idFlash = 0;    //ID Flash

//Data send via RS485
uint8_t bufferOfDataSendVia485[200];
uint16_t indexOfDataSendVia485 = 0;
uint8_t flagSendDataVia485 = 0;

#define WAIT_SEND_DATA_VIA_485      0
#define SEND_DATA_VIA_485           1
#define WAIT_FEEDBACK               2
void SendDataVia485Process(void);
uint16_t statusSendDataVia485 = WAIT_SEND_DATA_VIA_485;

#define AIR_COMPRESSOR_PIN      4
void AirCompressorProcess(void);

void PumpProcess(void);

void SimulateDataSaveFlash(void);

#define	GET_CHANEL1		0
#define	GET_CHANEL2		1
#define	GET_CHANEL3		2
void GetAD7799_Process (void);

void GetDataSensor(void);
void DigitalIO_Proccess(void);
uint32_t hexToFloat (uint32_t myNumba );
int main(void)
{
    //NVIC_SetVectorTable(NVIC_VectTab_FLASH, 0x800c000);
	init_system();
    //reinit_system();
    CloseAllOutput();
	delay_ms(100);
	BuzzerOff();
    Led2On();
    
    FirstProgram();
    ReadDataFromEeprom();
    PowerOnCounter();
    Buzzer(100);
    EnableWatchdogTimer();
    LcdClearScreen();

	while (1)
    {
		while(!flag_timer3);
		flag_timer3 = 0;
        
        scan_key_matrix();              // 4.813 us
        ReadInput();       

        DigitalIO_Proccess();
        
        GetAD7799_Process(); 
        GetADC();                       // 140.5 us
        GetDateAndTime();               // 1.25 us
        CalculatorADC();                // 102.4 us
        DisplayTime();                  // 19.37 us
        GiconProcess();
        
        GetDataSensor();
        
        CreateEvent();
        SendDataVia485Process();
        GetAD7799_Process();
        
        RTUProcessRecv();
        GprsProcess();
        EspProcess();
		GetTimeFromServerProcess();
        GetAutoSamplerProcess();
        ComTestProcess();
        MainProcess();
        Alarm();
        AutoSampler();
//        PumpProcess();
//        AirCompressorProcess();
        WatchdogTimerReload();
        DisplayLcdScreenOld();          // 9.555 ms
    }
}

void init_system(void)
{
    init_timer3();
	SetTimer3_ms(50);
    
    lcd_init();
    init_rtc();
    init_output();
	init_led();
	init_buzzer();
	
	USART1_Init(115200);
    USART2_Init(9600);
//    USART3_Init(9600);
    UART4_Init(9600);
//    UART5_Init(9600);
//    USART6_Init(9600);
    
	init_eeprom();
    init_address_variable();
	init_rs485();
	init_key_matrix();  
    init_flash();
    init_input();
    init_gprs();
    init_esp();
    init_watchdog(WATCHDOG_Timeout_32s);
    init_ad7799();
    
    init_output();
//	init_rtc();
//	init_led();
//	init_buzzer();
//	
//	USART1_Init(115200);
//    USART2_Init(9600);
////    USART3_Init(9600);
//    UART4_Init(9600);
////    UART5_Init(9600);
////    USART6_Init(9600);
//    
//	init_eeprom();
//    init_address_variable();
//	init_rs485();
//	init_key_matrix();  
//    init_flash();
//    init_input();
//    init_gprs();
//    init_esp();
//    init_watchdog(WATCHDOG_Timeout_32s);
    
    Led1On();
    delay_ms(1000);
    
    printf("\r\nABC Solutions\r\n");
    printf("Model: EnviLogger %dW\r\n", model);
    printf("Version %d.%d\r\n",version/10, version%10);
    
    LcdClearScreen();
    LcdPrintStringS(0,0, "   ABC SOLUTIONS");
    LcdPrintStringS(1,0, "  EnviLogger 1801W");
    LcdPrintNumOneDigitS(3,8,version);
    DisplayLcdScreenOld();
    delay_ms(5000);
}


void reinit_system(void)
{
//    uint16_t i = 0, j = 0;
//    
//    init_timer3();
//	SetTimer3_ms(50);
//    
//    init_output();
//	init_rtc();
//	init_led();
//	init_buzzer();
//	
//	USART1_Init(115200);
//    USART2_Init(9600);
////    USART3_Init(9600);
//    UART4_Init(9600);
////    UART5_Init(9600);
////    USART6_Init(9600);
//    
//	init_eeprom();
//    init_address_variable();
//	init_rs485();
//	init_key_matrix();  
//    init_flash();
//    init_input();
//    init_gprs();
//    init_esp();
//    init_watchdog(WATCHDOG_Timeout_32s);
//    
//    Led1On();
//    delay_ms(2000);
//    
//    LcdClearScreen();
//    LcdPrintStringS(1,0, "INITIALIZING SYSTEM");
//    LcdPrintStringS(2,2, "Please Stand By");
//    DisplayLcdScreenOld();
//    
////    for (i = 0; i < NUM_OF_CHANNEL; i++)
////    {
////        for (j = 0; j < NUMBER_OF_SAMPLE; j++)
////        {
////            GetADC();
////            delay_ms(10);
////        }
////    }
}

void MainProcess(void)
{
    static uint8_t checkPass;
	switch (statusMain)
    {
        case INIT_SYSTEM:
            indexOfNumber = 0;
			timeDelay = 0;
            DisplaySensorValue2();
            DisplayAlarmAutomatic();
            LcdPrintStringS(6,0,"                    ");
            DisplayInOut();
            SignalLed();
            ScreenProcess();
            if(isButtonEnter())
			{
                Led1Off();
                Led2Off();
				lcdHeadPointer = 0;
				LcdClearScreen();
				statusMain = ENTER_PASSWORD;
			}
            break;
        case ENTER_PASSWORD:
            LcdPrintStringS(0,0,"ENTER PASSWORD      ");	
			timeDelay ++;
			if (isButtonNumber())
			{
				LcdPrintStringS(1,indexOfNumber,"*");
				arrayPassword [indexOfNumber] = numberValue;
				indexOfNumber ++;
				timeDelay = 0;
			}
			if(isButtonClear() && indexOfNumber > 0)
			{
				indexOfNumber --;
				LcdPrintStringS(1,indexOfNumber," ");
				timeDelay = 0;
			}
			if(isButtonBack())
			{
				LcdClearScreen();
				lcdHeadPointer = 0;
				statusMain = INIT_SYSTEM;
			}
			if (indexOfNumber >= 6)
				statusMain = CHECK_PASSWORD;
			if (timeDelay >= 100)
			{
				LcdClearScreen();
				timeDelay = 0;
				statusMain = INIT_SYSTEM;
			}
            break;
        case CHECK_PASSWORD:
            LcdClearScreen();
			timeDelay = 0;
            
			if (CheckPassword() == 1)
			{
				pointerOfMenuPass_1 = 0;
				statusProcessPass_1 = INIT_SYSTEM;
				statusMain = MATCH_PASSWORD_1;
			}
			else if(CheckPassword() == 2)
			{	
				pointerOfMenuPass_2 = 0;
				statusProcessPass_2 = INIT_SYSTEM;
				statusMain = MATCH_PASSWORD_2;                
			}
            else if(CheckPassword() == 3)
			{	
				pointerOfMenuPass_3 = 0;
				statusProcessPass_3 = INIT_SYSTEM;
				statusMain = MATCH_PASSWORD_3;
			}
			else if(CheckPassword() == 4)
			{
                
                checkPass = 4;
				pointerOfMenuPassAdmin = 0;
				statusProcessPassAdmin = INIT_SYSTEM;
				statusMain = MATCH_PASSWORD_ADMIN;
			}
            else if(CheckPassword() == 5)
			{
				pointerOfMenuPass_5 = 0;
				statusProcessPass_5 = INIT_SYSTEM;
				statusMain = MATCH_PASSWORD_5;
			}
            else if(CheckPassword() == 6)
			{
                checkPass = 6;
				pointerOfMenuPassAdmin = 0;
				statusProcessPassAdmin = INIT_SYSTEM;
				statusMain = MATCH_PASSWORD_ADMIN;
			}
			else
				statusMain = WRONG_PASSWORD;
            break;
        case MATCH_PASSWORD_1:
            ProcessPass_1();
			if(isButtonBack() && (levelOfKeyBack == 0))
			{
				lcdHeadPointer = 0;
				LcdClearScreen();
				timeDelay = 0;
				indexOfNumber = 0;
				statusMain = INIT_SYSTEM;
			}
            break;
        case MATCH_PASSWORD_2:
            ProcessPass_2();
			if(isButtonBack() && (levelOfKeyBack == 0))
			{
				lcdHeadPointer = 0;
				LcdClearScreen();
				timeDelay = 0;
				indexOfNumber = 0;
				statusMain = ENTER_PASSWORD;
			}
            break;
        case MATCH_PASSWORD_3:
            ProcessPass_3();
			if(isButtonBack() && (levelOfKeyBack == 0))
			{
				lcdHeadPointer = 0;
				LcdClearScreen();
				timeDelay = 0;
				indexOfNumber = 0;
				statusMain = ENTER_PASSWORD;
			}
            break;   
        case MATCH_PASSWORD_5:
            ProcessPass_5();
			if(isButtonBack() && (levelOfKeyBack == 0))
			{
				lcdHeadPointer = 0;
				LcdClearScreen();
				timeDelay = 0;
				indexOfNumber = 0;
				statusMain = ENTER_PASSWORD;
			}
            break;    
        case MATCH_PASSWORD_ADMIN:
            ProcessPassAdmin(checkPass);
			if(isButtonBack() && (levelOfKeyBack == 0))
			{
				lcdHeadPointer = 0;
				LcdClearScreen();
				timeDelay = 0;
				indexOfNumber = 0;
				statusMain = ENTER_PASSWORD;
			}
            break;
        case WRONG_PASSWORD:
            timeDelay ++;
			indexOfNumber = 0;
			LcdPrintStringS(0,0,"WRONG PASSWORD      ");
			if (timeDelay >= 20)
			{
				LcdClearScreen();
				statusMain = ENTER_PASSWORD;
			}
            break;
        default:
            statusMain = INIT_SYSTEM;
            break;
        
    }
}

uint8_t CheckPassword(void)
{
	unsigned char i,j;
	unsigned result = 1;
	for (i=0;i<5;i++)
	{
		result = 1;
		for (j=0;j<6;j++)
		{
            if (arrayPassword[j] != arrayMapOfPassword[i][j])
                result = 0;
		}
		if (result == 1)
				return (i+1);
	}
    
	for (j=0;j<6;j++)
    {
        if (arrayPassword[j] != getSystemPassword(j))
            return 0;
    }
    
	return 6;
}

void FirstProgram(void) {
    // Check if not version, restore memory
	if(EepromReadInt(addressVersion) == version) return;
    
    delay_ms(250);
    LcdClear();
    delay_ms(250);
    LcdPrintString(2,2,"Restoring... 0%");
    Buzzer(100);
    
    RestoreDigitalIO();
    RestoreSim800lHttp();
    RestoreAutoSampler();
    RestoreFtpInfo();
    RestoreAdcCalib();
    RestoreAlarmThres();
    RestoreDeviceInfo();
    RestoreSystemConfig();
    RestoreSensorConfig();
    
    // Erase flash
    LcdPrintString(2,15,"50%");
    
    FlashEraseAll();
    
    // Version
    EepromWriteInt(addressVersion, version);
    
    LcdPrintString(2,2,"Restore DONE.     ");
    delay_ms(2000);
}

void ReadDataFromEeprom(void)
{
    ReadDigitalIO();
    ReadSim800lHttp();
    ReadAutoSampler();
    ReadFtpInfo();
    ReadAdcCalib();
    ReadAlarmThres();
    ReadDeviceInfo();
    ReadSystemConfig();
    ReadSensorConfig();
}

void PowerOnCounter(void)
{
    numberOfPowerOn = numberOfPowerOn + 1;
    EepromWriteLong(addressNumberOfPowerOn, numberOfPowerOn);
}

void SignalLed(void)
{
    static uint16_t timeBlink = 0;
    
    timeBlink = (timeBlink + 1) % 64;
    if (timeBlink == 63) Led2Off();
    
    if (pHeadSimSendBuffer != pCurrentSavedBuffer && strlen(arrayOfIpAndDomain) > 0) {
        if (timeBlink == 0) Led2On();
        else if (timeBlink / 10 == 0) Led2Off();
    }
    
    if (pHeadFtpSendBuffer[0] != pCurrentSavedBuffer && strlen(ftpServer[0]) > 0) {
        if (timeBlink == 10 || timeBlink == 14) Led2On();
        else if (timeBlink / 10 == 1) Led2Off();
    }
    
    if (pHeadFtpSendBuffer[1] != pCurrentSavedBuffer && strlen(ftpServer[1]) > 0) {
        if (timeBlink == 24 || timeBlink == 28 || timeBlink == 32) Led2On();
        else if (timeBlink / 20 == 1) Led2Off();
    }
    
    if (pHeadFtpSendBuffer[2] != pCurrentSavedBuffer && strlen(ftpServer[2]) > 0) {
        if (timeBlink == 42 || timeBlink == 46 || timeBlink == 50 || timeBlink == 54) Led2On();
        else if (timeBlink / 40 == 1) Led2Off();
    }
    
    BlinkLed();
}

void DisplaySensorValue(void)
{
    uint8_t i, j;
    static uint16_t sensorDisplay = 0;
    static uint16_t cnt = 0;

    if (cnt == 0)
    {
        LcdClearScreen();
        switch (sensorDisplay)
        {
            case 0: 
                for (i = 0; (i < 4 && numOfSensor/4 >= 1) || (i < (numOfSensor % 4)); i++)
                {
                    for (j = 0; j < indexOfSensorName[i+sensorDisplay]; j++)
                    {
                        LcdPrintCharS(i, j, sensorName[i+sensorDisplay][j]);
                    }
                    LcdPrintNumOneDigitS(i, 7, sensorValue[i+sensorDisplay]);
                    
                    for (j = 0; j < indexOfSensorUnit[i+sensorDisplay]; j++)
                    {
                        LcdPrintCharS(i, j+14, sensorUnit[i+sensorDisplay][j]);
                    }
                    if (sensorAlarm[sensorDisplay+i] == 1 && (cnt%10) > 5)
                    LcdPrintStringS(i,0,"                    ");
                }
                if (numOfSensor > 4)
                    sensorDisplay = 4;
                else
                    sensorDisplay = 0;
                break;
            case 4:
                for (i = 0; (i < 4 && numOfSensor/4 >= 2) || (i < (numOfSensor % 4)); i++)
                {
                    for (j = 0; j < indexOfSensorName[i+sensorDisplay]; j++)
                    {
                        LcdPrintCharS(i, j, sensorName[i+sensorDisplay][j]);
                    }
                    LcdPrintNumOneDigitS(i, 7, sensorValue[i+sensorDisplay]);
                    
                    for (j = 0; j < indexOfSensorUnit[i+sensorDisplay]; j++)
                    {
                        LcdPrintCharS(i, j+14, sensorUnit[i+sensorDisplay][j]);
                    }
                    if (sensorAlarm[sensorDisplay+i] == 1 && (cnt%10) > 5)
                    LcdPrintStringS(i,0,"                    ");
                }
                if (numOfSensor > 8)
                    sensorDisplay = 8;
                else
                    sensorDisplay = 0;
                break;
            case 8:
                for (i = 0; (i < 4 && numOfSensor/4 >= 3) || (i < (numOfSensor % 4)); i++)
                {
                    for (j = 0; j < indexOfSensorName[i+sensorDisplay]; j++)
                    {
                        LcdPrintCharS(i, j, sensorName[i+sensorDisplay][j]);
                    }
                    LcdPrintNumOneDigitS(i, 7, sensorValue[i+sensorDisplay]);
                    
                    for (j = 0; j < indexOfSensorUnit[i+sensorDisplay]; j++)
                    {
                        LcdPrintCharS(i, j+14, sensorUnit[i+sensorDisplay][j]);
                    }
                    if (sensorAlarm[sensorDisplay+i] == 1 && (cnt%10) > 5)
                    LcdPrintStringS(i,0,"                    ");
                }
                if (numOfSensor > 12)
                    sensorDisplay = 12;
                else
                    sensorDisplay = 0;
                break;
            case 12:
                for (i = 0; (i < 4 && numOfSensor/4 >= 4) || (i < (numOfSensor % 4)); i++)
                {
                    for (j = 0; j < indexOfSensorName[i+sensorDisplay]; j++)
                    {
                        LcdPrintCharS(i, j, sensorName[i+sensorDisplay][j]);
                    }
                    LcdPrintNumOneDigitS(i, 7, sensorValue[i+sensorDisplay]);
                    
                    for (j = 0; j < indexOfSensorUnit[i+sensorDisplay]; j++)
                    {
                        LcdPrintCharS(i, j+14, sensorUnit[i+sensorDisplay][j]);
                    }
                    if (sensorAlarm[sensorDisplay+i] == 1 && (cnt%10) > 5)
                    LcdPrintStringS(i,0,"                    ");
                }
                if (numOfSensor > 16)
                    sensorDisplay = 16;
                else
                    sensorDisplay = 0;
                break;
            case 16:
                for (i = 0; (i < 4 && numOfSensor/4 >= 5) || (i < (numOfSensor % 4)); i++)
                {
                    for (j = 0; j < indexOfSensorName[i+sensorDisplay]; j++)
                    {
                        LcdPrintCharS(i, j, sensorName[i+sensorDisplay][j]);
                    }
                    LcdPrintNumOneDigitS(i, 7, sensorValue[i+sensorDisplay]);
                    
                    for (j = 0; j < indexOfSensorUnit[i+sensorDisplay]; j++)
                    {
                        LcdPrintCharS(i, j+14, sensorUnit[i+sensorDisplay][j]);
                    }
                    if (sensorAlarm[sensorDisplay+i] == 1 && (cnt%10) > 5)
                    LcdPrintStringS(i,0,"                    ");
                }
                    sensorDisplay = 0;
                break;
        }
    }
    if(cnt++ == 50)    cnt = 0;

}

void CalculatorADC(void)
{
    uint16_t ADC_VBAT_MULTI = 2;
    uint32_t VREFINT_CAL_ADDR = 0x1FFF7A2A;
    uint16_t vrefint_cal;
    uint16_t i = 0;
    
    LcdClearSRow(36);
    LcdClearSRow(37);
    LcdClearSRow(38);
    
    LcdPrintNumS(36,0,adc_value[0]);
    LcdPrintNumOneDigitS(36,5,yValue[0]);
    LcdPrintNumS(36,10,adc_value[1]);
    LcdPrintNumOneDigitS(36,15,yValue[1]);
    LcdPrintNumS(37,0,adc_value[2]);
    LcdPrintNumOneDigitS(37,5,yValue[2]);
    LcdPrintNumS(37,10,adc_value[3]);
    LcdPrintNumOneDigitS(37,15,yValue[3]);
    LcdPrintNumS(38,0,adc_value[4]);
    LcdPrintNumOneDigitS(38,5,yValue[4]);
    LcdPrintNumS(38,10,adc_value[5]);
    LcdPrintNumOneDigitS(38,15,yValue[5]);
    
    for (i = 0; i < 3; i++)
    {
        yValue[i] = yMin[i] + (int64_t)(adcValue_AD1[i] - xMin[i])*(yMax[i] - yMin[i])/(xMax[i] - xMin[i]);
        if(yValue[i] < 0)
            yValue[i] = 0;
    }
    
    for (i = 3; i < 6; i++)
    {
        yValue[i] = yMin[i] + (int64_t)(adcValue_AD2[i-3] - xMin[i])*(yMax[i] - yMin[i])/(xMax[i] - xMin[i]);
        if(yValue[i] < 0)
            yValue[i] = 0;
    }
    
    for (i = 6; i < 9; i++)
    {
        yValue[i] = yMin[i] + (int64_t)(adcValue_AD3[i-6] - xMin[i])*(yMax[i] - yMin[i])/(xMax[i] - xMin[i]);
        if(yValue[i] < 0)
            yValue[i] = 0;
    }
    
    //Internal Temperature Sensor
    /*
    * According to ST:
    * VREF = 2.5V
    *   25°C === 0.76V  = 760mV ~ 1244.88 ADC
    *   2.5 mV/°C
    =>  125°C === 1.01V = 1010mV ~ 1654.38 ADC
    */
    internal_temp_sensor = 25 + (uint32_t)(adc_value[7] - 1245)*(125 - 25)/(1654-1244);
    if (internal_temp_sensor < 0)
        internal_temp_sensor = 0;
    LcdClearSRow(35);
    LcdPrintStringS(35,0,"InternalTemp:");
    LcdPrintNumS(35,14,internal_temp_sensor);
    LcdPrintCharS(35,16,0xdf);
    LcdPrintCharS(35,17,'C');
    
    //VBAT & VREF
    vbat = adc_value[6] * ADC_VBAT_MULTI * 250 / 4095;
    vrefint_cal= *((uint16_t*)VREFINT_CAL_ADDR);    // read VREFINT_CAL_ADDR memory location
    vref = 330 * vrefint_cal / adc_value[8];
    LcdClearSRow(33);
    LcdClearSRow(34);
    LcdPrintStringS(33,0,"VBAT:");
    LcdPrintNumPercentS(33,6,vbat);
    LcdPrintStringS(33,10,"V");
    LcdPrintStringS(34,0,"VDDA:");
    LcdPrintNumPercentS(34,5,vref);
    LcdPrintStringS(34,10,"V");
}

unsigned long SeparateNum(int num, int x) {
	char i;
	unsigned long temp = 1;
	for(i = 0; i < x; i++)
		temp *= num;
	return temp;
}

void PutCharToBuffer(char data)
{
    bufferOfDataSendVia485[indexOfDataSendVia485] = data;
    indexOfDataSendVia485 = (indexOfDataSendVia485 + 1)%200;
}

void PutStringToBuffer(char *string)
{
    while (*string)  
    {
        bufferOfDataSendVia485[indexOfDataSendVia485] = *string++;
        indexOfDataSendVia485 = (indexOfDataSendVia485 + 1)%200;
    }
}

void PutNumToBuffer(long num)
{
    char num_flag = 0;
	char i;
	
	if(num == 0) 
    {
		bufferOfDataSendVia485[indexOfDataSendVia485] = '0';
        indexOfDataSendVia485 = (indexOfDataSendVia485 + 1)%200;
		return;
	}
	if(num < 0) 
    {
		bufferOfDataSendVia485[indexOfDataSendVia485] = '-';
        indexOfDataSendVia485 = (indexOfDataSendVia485 + 1)%200;
		num = num * -1;
	}
	for(i = 10; i > 0; i--) 
    {
		if((num / SeparateNum(10, i-1)) != 0) 
        {
			num_flag = 1;
            bufferOfDataSendVia485[indexOfDataSendVia485] = num/SeparateNum(10, i-1) + '0';
            indexOfDataSendVia485 = (indexOfDataSendVia485 + 1)%200;
		}
		else 
        {
			if(num_flag != 0)
            {
                bufferOfDataSendVia485[indexOfDataSendVia485] = '0';
                indexOfDataSendVia485 = (indexOfDataSendVia485 + 1)%200;
            }
		}
		num %= SeparateNum(10, i-1);
	}	
}

void PutNumOneDigitToBuffer(long num)
{
    PutNumToBuffer(num/10);
    PutStringToBuffer(".");
    PutNumToBuffer(num%10);
}

uint8_t CheckSumBufferSendData485(void)
{
    uint8_t i = 0, sum = 0;
    for (i = 0; i < indexOfDataSendVia485 - 1; i++)
        sum = sum + bufferOfDataSendVia485[i];
    sum = ~sum;
    sum = sum + 1;
    return sum;
}

void UpdateDataSendVia485(void)
{
    uint8_t i,j;
    indexOfDataSendVia485 = 0;
    PutNumToBuffer(date/10);
    PutNumToBuffer(date%10);
    PutStringToBuffer(".");
    PutNumToBuffer(month/10);
    PutNumToBuffer(month%10);
    PutStringToBuffer(".");
    PutNumToBuffer(year/10);
    PutNumToBuffer(year%10);
    PutStringToBuffer(" ");
    PutNumToBuffer(hour/10);
    PutNumToBuffer(hour%10);
    PutStringToBuffer(":");
    PutNumToBuffer(minute/10);
    PutNumToBuffer(minute%10);
    PutStringToBuffer(":");
    PutNumToBuffer(second/10);
    PutNumToBuffer(second%10);
    
    PutCharToBuffer(' ');
    
     for (i = 0; i < numOfSensor; i++)
    {
        for (j = 0; j < indexOfSensorName[i]; j++)
        {
            PutCharToBuffer(sensorName[i][j]);
        }
        PutStringToBuffer("= ");
        PutNumOneDigitToBuffer(sensorValue[i]);
        PutCharToBuffer(' ');
        for (j = 0; j < indexOfSensorUnit[i]; j++)
        {
            PutCharToBuffer(sensorUnit[i][j]);
        }
        if (i != numOfSensor - 1)
            PutCharToBuffer(' ');
        else            
            PutCharToBuffer(';');
    }
    PutCharToBuffer(CheckSumBufferSendData485());
    PutStringToBuffer("\r\n");
}

void CreateEvent(void)
{
    static uint16_t statusCreateEvent = 1;
    //static uint16_t cntOfTime = 0;
    static uint16_t timeDelayCreateEvent = 0;
    
    switch (statusCreateEvent)
    {
        case 0: //Gui lan dau tien
            if (second == 0)
            {
//                PutTimeAndDataToFlash();
//                UpdateDataSendVia485();
//                flagSendDataVia485 = 1;
                statusCreateEvent = 2;
            }
            break;
        case 1: //Gui theo sampleInterval
            timeDelayCreateEvent = 0;
            if (second == 0)
            {
//                cntOfTime = (cntOfTime + 1)%sampleInterval;
//                if (cntOfTime == 0)
                if (minute % sampleInterval == 0)
                {
                    PutTimeAndDataToFlash();
                    UpdateDataSendVia485();
                    flagSendDataVia485 = 1;
                }
                statusCreateEvent = 2;
            }
            break;
        case 2: //Tao khoang thoi gian delay
            timeDelayCreateEvent = timeDelayCreateEvent + 1;
            if (timeDelayCreateEvent > 40) {
                timeDelayCreateEvent = 0;
                statusCreateEvent = 1;
            }
            break;
        default:
            statusCreateEvent = 0;
            break;
    }
}

void SendDataViaRS485(void)
{
    uint16_t i = 0;
    RS485_DirEN(RS485Transmit);
    for (i = 0; i < indexOfDataSendVia485; i++) {
        RS485_Send(bufferOfDataSendVia485[i]);
    }
    delay_ms(3);
    RS485_DirEN(RS485Receive);
}

void SendDataVia485Process(void)
{
    static uint16_t timeDelay = 0;
    
    switch (statusSendDataVia485)
    {
        case WAIT_SEND_DATA_VIA_485:
            if (flagSendDataVia485 == 1)
                statusSendDataVia485 = SEND_DATA_VIA_485;
            break;
        case SEND_DATA_VIA_485:
            timeDelay = 0;
            SendDataViaRS485();
            statusSendDataVia485 = WAIT_FEEDBACK;
            break;
        case WAIT_FEEDBACK:
            timeDelay = timeDelay + 1;
            if (timeDelay > (5*20))
            {
                timeDelay = 0;
                statusSendDataVia485 = SEND_DATA_VIA_485;
            }
            if (flagCompleteDataFeedback == 1)
            {
                flagCompleteDataFeedback = 0;
                if (bufferOfDataFeedback[0] == 'O' && bufferOfDataFeedback[1] == 'K')
                {
                    if (enablePrintfTest == 1 && enableUpgradeEsp == 0)
                        printf("\nSend Data Via RS485 Complete\r\n");
                    timeDelay = 0;
                    flagSendDataVia485 = 0;
                    statusSendDataVia485 = WAIT_SEND_DATA_VIA_485;
                }
                indexOfDataFeedback = 0;
            }
            break;
        default:
            statusSendDataVia485 = WAIT_SEND_DATA_VIA_485;
            break;
    }
}


void GetDataSensor(void)
{
    uint8_t i = 0;
    static uint8_t count = 0;
    count++;
    
    if (count == 40)
    {
        GetDataRTU(0,99);
    }
    if (count == 80)
    {
        GetDataRTU(100,98);
    }
    if (count == 120)
    {
        GetDataRTU(199,97);
    }
    if (count == 160)
    {
        count = 0;
        GetDataRTU(296,103);
    }
    for (i =0;i<numOfSensor;i++)
    {
       if (sourceValue[i] < 9)
         sensorValue[i] = yValue[sourceValue[i]];
       
       if (sourceValue[i] == 9)// Source = RTU
       {
         sensorValue[i] = hexToFloat(RegRTU[RTUValue[i]]*256*256 + RegRTU[RTUValue[i]+1]);
       }
       
       if (sourceValue[i] == 10)// Source = GICON
       {
         sensorValue[i] = getGiconValue(giconValueIndex[i]);
       }
    }
}

uint8_t isOverThreshold(void)
{
    uint8_t i;
    for (i=0;i<numOfSensor;i++)
    {
        if ((valueThresholdMax[i] != 0 && sensorValue[i] > valueThresholdMax[i] && sensorStatus[i] == 0) || (sensorValue[i] < valueThresholdMin[i] && sensorStatus[i] == 0))
            return 1;
    }
        return 0;
}

void DisplayAlarmAutomatic(void)
{
    uint8_t i;
	static uint16_t timeBlink = 0;
	timeBlink = (timeBlink + 1)%20;
    if (enableThresholdAlarm == 1)
    {
        for (i=0;i<numOfSensor;i++)
        {
            if((valueThresholdMax[i] != 0 && sensorValue[i] > valueThresholdMax[i]) || (sensorValue[i] < valueThresholdMin[i]))
                sensorAlarm[i] = 1;
            else
                sensorAlarm[i] = 0;
        }
        
    }
    
    if (numberOfBottle >= NUMBER_OF_BOTTLE)
    {
        if (timeBlink > 10)
            LcdPrintStringS(3,0,"          ");
    }
}

void AlarmLight(void)
{
//    OpenOutput(LIGHT_PIN);
    flagOutput[OPEN_LIGHT] = 1;
}

void AlarmBuzzer(void)
{
    static uint8_t cnt = 0;
//    OpenOutput(BUZZER_PIN);
    flagOutput[OPEN_BUZZ] = 1;
    cnt = (cnt + 1)%10;
    if (cnt < 5)
        BuzzerOn();
    else
        BuzzerOff();
}

uint8_t isPumpRunning(void)
{
    if (input_code[CHECK_PUMP] > 0)
        return 1;
    else
        return 0;
}

uint8_t isButtonTurnOffAlarm(void)
{
    uint8_t i = 0;
    for (i = 0; i < 16; i++)
    {
        if (key_code[i] > 0)
            return 1;
    }
    if (input_code[2] == 1)
        return 1;
    else
        return 0;
    
}

void SaveInfoSampler(unsigned char index)
{
    hourSampler[index] = hour;
    EepromWriteInt(addressHourSampler[index], hourSampler[index]);
    minuteSampler[index] = minute;
    EepromWriteInt(addressMinuteSampler[index], minuteSampler[index]);
    secondSampler[index] = second;
    EepromWriteInt(addressSecondSampler[index], secondSampler[index]);
    dateSampler[index] = date;
    EepromWriteInt(addressDateSampler[index], dateSampler[index]);
    monthSampler[index] = month;
    EepromWriteInt(addressMonthSampler[index], monthSampler[index]);
    yearSampler[index] = year;
    EepromWriteInt(addressYearSampler[index], yearSampler[index]);
}

uint8_t isOverASThreshold(uint8_t _sens) {
    if (_sens >= numOfSensor) return 0;
    
    if (    (asThresholdMax[_sens] != 0 && sensorValue[_sens] > asThresholdMax[_sens] && sensorStatus[_sens] == 0) 
        ||  (sensorValue[_sens] < asThresholdMin[_sens] && sensorStatus[_sens] == 0) )
    {
        return 1;
    }
    
    return 0;
}

uint8_t isNewOverASThreshold(uint8_t _sens) {
    static uint8_t isOvering[20] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};

    if (_sens >= numOfSensor) return 0;

    if (    (asThresholdMax[_sens] != 0 && sensorValue[_sens] > asThresholdMax[_sens] && sensorStatus[_sens] == 0) 
            ||  (sensorValue[_sens] < asThresholdMin[_sens] && sensorStatus[_sens] == 0) )
    {
        if (!isOvering[_sens]) {
            isOvering[_sens] = 1;
            return 1;
        }
    }
    else {
        isOvering[_sens] = 0;
    }
    return 0;
}

void AutoSampler(void)
{    
    static uint8_t _sens;
    uint8_t i = 0;
    
    switch (statusAutoSampler)
    {
        case INIT_SYSTEM:
            LcdPrintStringS(40,0,"AS_INIT_SYSTEM      ");
            // Check remote
            if (flagAutoSampler == 1)
            {
                cntOfAutoSampler = 0;
                numberOfPump = 0;
                statusAutoSampler = CHECK_EMPTY_BOTTLE;
            }
            
            // Check new over threshold, and remember sensor (_sens) to check out of Threshold
            if (enableAutoSampler == 1)
            {
                for (i = 0; i < numOfSensor; i++)
                {
                    if (!isNewOverASThreshold(i)) continue; 
                    
                    _sens = i;
                    cntOfAutoSampler = 0;
                    statusAutoSampler = WAIT_AUTO_SAMPLER;
                    break;
                }                    
            }
            break;
            
        case WAIT_AUTO_SAMPLER:
            // Wait 2 minutes then taking water sample
            cntOfAutoSampler++;
            if (cntOfAutoSampler > 20*60*2) {
                cntOfAutoSampler = 0;
                numberOfPump = 0;
                statusAutoSampler = CHECK_EMPTY_BOTTLE;
            }
            
            // If checking sensor (_sens) is not out of Threshold, not take water sample
            if (!isOverASThreshold(_sens) || !enableAutoSampler) {
                statusAutoSampler = INIT_SYSTEM;
            }
            break;
            
        case CHECK_EMPTY_BOTTLE:
            LcdPrintStringS(40,0,"AS_CHECK_BOTTLE     ");
            if (numberOfBottle >= NUMBER_OF_BOTTLE)
            {
                lcdHeadPointer = 0;
                statusAutoSampler = FULL_BOTTLE;
            }
            else
                statusAutoSampler = PUMP;
            break;
        case FULL_BOTTLE:
            LcdPrintStringS(40,0,"AS_FULL_BOTTLE      ");
            LcdPrintStringS(0,0,"FULL BOTTLE         ");
            LcdPrintStringS(1,0,"                    ");
            LcdPrintStringS(2,0,"                    ");
            AlarmLight();
            if (isButtonTurnOffAlarm())
            {
                statusAutoSampler = INIT_SYSTEM;
                flagAutoSampler = 0;
                flagOutput[OPEN_LIGHT] = 0;
//                CloseOutput(LIGHT_PIN);
            }
            break;
        case PUMP:
            LcdPrintStringS(40,0,"AS_PUMP             ");
//            OpenOutput(SAMPLER_PUMP);
            flagOutput[TAKE_SAMPLE] = 1;
            cntOfAutoSampler = cntOfAutoSampler + 1;
            if (cntOfAutoSampler >= 20)
            {
                cntOfAutoSampler = 0;
                statusAutoSampler = PUMP_1;
            }
            break;
        case PUMP_1:
            LcdPrintStringS(40,0,"AS_PUMP_1           ");
//            CloseOutput(SAMPLER_PUMP);
            flagOutput[TAKE_SAMPLE] = 0;
            cntOfAutoSampler = cntOfAutoSampler + 1;
            LcdPrintNumS(40,15,cntOfAutoSampler/20);
            if (cntOfAutoSampler >= (TIME_OUT_PUMP*60*20))
            {
                cntOfAutoSampler = 0;
                lcdHeadPointer = 0;
                flagErrorSampler = 1;
                EepromWriteByte(addressFlagErrorSampler, flagErrorSampler);
                statusAutoSampler = NO_WATER;
            }
            if (isPumpRunning())
            {
                cntOfAutoSampler = 0;
                statusAutoSampler = PUMP_2;
            }
            break;
        case PUMP_2:
            LcdPrintStringS(40,0,"AS_PUMP_2           ");
            cntOfAutoSampler = cntOfAutoSampler + 1;
            LcdPrintNumS(40,15,cntOfAutoSampler/20);
            if (cntOfAutoSampler >= (90*20))  //timeout 90 seconds
            {
                numberOfPump ++;
                if (numberOfPump == NUMBER_OF_PUMP)
                {
                    SaveInfoSampler(numberOfBottle);
                    numberOfBottle = numberOfBottle + 1;
                    EepromWriteByte(addressNumberOfBottle, numberOfBottle);
                }
                cntOfAutoSampler = 0;
                if (numberOfPump >= NUMBER_OF_PUMP)
                    statusAutoSampler = WAIT_MOVE_TURN;
                else
                    statusAutoSampler = WAIT_PUMP;
            }
            break;
        case WAIT_PUMP:
            LcdPrintStringS(40,0,"AS_WAIT_PUMP        ");
            cntOfAutoSampler = cntOfAutoSampler + 1;
            LcdPrintNumS(40,15,cntOfAutoSampler/20);
            if (cntOfAutoSampler > (20*20))
            {
                cntOfAutoSampler = 0;
                statusAutoSampler = PUMP;
            }
            break;
        case WAIT_MOVE_TURN:
            LcdPrintStringS(40,0,"AS_WAIT_MOVE        ");
            cntOfAutoSampler = cntOfAutoSampler + 1;
            LcdPrintNumS(40,15,cntOfAutoSampler/20);
            if (cntOfAutoSampler > (20*20))
            {
                cntOfAutoSampler = 0;
                statusAutoSampler = MOVE_TURN;
            }
            break;
        case NO_WATER:
            LcdPrintStringS(40,0,"AS_NO_WATER         ");
            LcdPrintStringS(0,0,"ERROR AUTO SAMPLER  ");
            LcdPrintStringS(1,0,"                    ");
            LcdPrintStringS(2,0,"                    ");
            AlarmLight();
            if (isButtonTurnOffAlarm())
            {
                statusAutoSampler = INIT_SYSTEM;
                flagAutoSampler = 0;
//                CloseOutput(LIGHT_PIN);
                
                flagOutput[OPEN_LIGHT] = 0;
            }
            break;
        case MOVE_TURN:
            LcdPrintStringS(40,0,"AS_MOVE_TURN        ");
            cntOfAutoSampler = cntOfAutoSampler + 1;
            LcdPrintNumS(40,15,cntOfAutoSampler/20);
            if (cntOfAutoSampler >= 40)
            {
                cntOfAutoSampler = 0;
                statusAutoSampler = MOVE_TURN_1;
            }
            break;
        case MOVE_TURN_1:
            LcdPrintStringS(40,0,"AS_MOVE_TURN_1      ");
//            OpenOutput(SAMPLER_MOVE);    
            flagOutput[MOVE_SAMPLE] = 1;
            cntOfAutoSampler = cntOfAutoSampler + 1;
            LcdPrintNumS(40,15,cntOfAutoSampler/20);
            if (cntOfAutoSampler >= 20)
            {
                cntOfAutoSampler = 0;
                statusAutoSampler = MOVE_TURN_2;
            }
            break;
        case MOVE_TURN_2:
            LcdPrintStringS(40,0,"AS_MOVE_TURN_2      ");
//            CloseOutput(SAMPLER_MOVE);  
            flagOutput[MOVE_SAMPLE] = 0;
            flagAutoSampler = 0;
            statusAutoSampler = INIT_SYSTEM;
            break;    
        default:
            statusAutoSampler = INIT_SYSTEM;
            break;
    }
}
void DisplaySensorValue2(void)
{
    uint8_t  j, p;
    static uint16_t i = 0;
    static uint16_t cnt = 0;

    LcdClearScreen();
    
    // Display within 5s
    if (cnt++>60)
    {
        cnt =0;
        i++;
    }
    if (isButtonNext()) i = (i+1)%numOfSensor;
    if (isButtonPrev()) i = (i+numOfSensor-1)%numOfSensor;
    for (p = 0; p < 3 && numOfSensor > 3; p++)
    {
        for (j = 0; j < indexOfSensorName[(p+i)%numOfSensor]; j++)
        {
            LcdPrintCharS(p, j, sensorName[(p+i)%numOfSensor][j]);
        }
        LcdPrintNumOneDigitS(p, 7, sensorValue[(p+i)%numOfSensor]);
        
        for (j = 0; j < indexOfSensorUnit[(p+i)%numOfSensor]; j++)
        {
            LcdPrintCharS(p, j+14, sensorUnit[(p+i)%numOfSensor][j]);
        }
    }
    for (p = 0; p < numOfSensor && numOfSensor <= 3; p++)
    {
        for (j = 0; j < indexOfSensorName[p]; j++)
        {
            LcdPrintCharS(p, j, sensorName[p][j]);
        }
        LcdPrintNumOneDigitS(p, 7, sensorValue[p]);
        
        for (j = 0; j < indexOfSensorUnit[p]; j++)
        {
            LcdPrintCharS(p, j+14, sensorUnit[p][j]);
        }
    }

    
    LcdPrintStringS(3,0,"Sample: ");
    LcdPrintNumS(3,7,numberOfBottle);    
}
void Alarm(void)
{
    static uint32_t cntOfAlarm = 0;
    switch (statusAlarm)
    {
        case INIT_SYSTEM:
            LcdPrintStringS(39,0,"ALARM_INIT_SYSTEM   ");
            if (isOverThreshold() == 1)
            {
                cntOfAlarm = 0;
                statusAlarm = ALARM_LIGHT;
            }
            break;
        case ALARM_LIGHT:
            LcdPrintStringS(39,0,"ALARM_LIGHT         ");
            LcdPrintNumS(39,15,cntOfAlarm/20);
            if (enableThresholdAlarm == 1)
                AlarmLight();
            cntOfAlarm = cntOfAlarm + 1;
            if (isOverThreshold() == 0)
            {
//                CloseOutput(LIGHT_PIN);
                  
                flagOutput[OPEN_LIGHT] = 0;
                statusAlarm = INIT_SYSTEM;
            }
            if (cntOfAlarm >= TIME_ALARM_LIGHT*60*20)  //5min
            {
                cntOfAlarm = 0;
                lcdHeadPointer = 0;
                statusAlarm = ALARM_BUZZER;
            }
            break;
        case ALARM_BUZZER:
            LcdPrintStringS(39,0,"ALARM_BUZZER        ");
            if (enableThresholdAlarm == 1)
            {
                AlarmLight();
                AlarmBuzzer();
            }
            if (isButtonTurnOffAlarm())
            {
                statusAlarm = WAIT_HANDLE;
//                CloseOutput(BUZZER_PIN);
                  
                flagOutput[OPEN_BUZZ] = 0;
            }
            if (isOverThreshold() == 0)
            {
//                CloseOutput(BUZZER_PIN);
                flagOutput[OPEN_BUZZ] = 0;
//                CloseOutput(LIGHT_PIN);
                flagOutput[OPEN_LIGHT] = 0;
                statusAlarm = INIT_SYSTEM;
            }
            break;
        case WAIT_HANDLE:
            LcdPrintStringS(39,0,"ALARM_WAIT_HANDLE   ");
            if (enableThresholdAlarm == 1)
                AlarmLight();
            if (isOverThreshold() == 0)
           {
//                CloseOutput(LIGHT_PIN);
                
                flagOutput[OPEN_LIGHT] = 0;
                statusAlarm = INIT_SYSTEM;
            }
            break;
        default:
            statusAlarm = INIT_SYSTEM;
            break;
    }
}

void PumpProcess(void)
{
    static uint32_t cnt = 0, timeOpen = 0;
    static uint16_t statusPumpCompressor = 0;
    
    cnt = (cnt + 1)%(30*60*20);
    switch (statusPumpCompressor)
    {
        case 0:
            if (cnt == (10*20)) //10s sau khi mo may se kich may khi nen
            {
                flagOutput[OPEN_PUMP] = 1;
                statusPumpCompressor = 1;
                timeOpen = 0;
            }
            break;
        case 1:
            timeOpen = timeOpen + 1;
            if (timeOpen > (5*60*20))
            {
                flagOutput[OPEN_PUMP] = 0;
                statusPumpCompressor = 0;
            }
            break;
        default:
            statusPumpCompressor = 0;
            break;
    }
}


void AirCompressorProcess(void)
{
    static uint32_t cnt = 0, timeOpen = 0;
    static uint16_t statusAirCompressor = 0;
    
    cnt = (cnt + 1)%(30*60*20);
    switch (statusAirCompressor)
    {
        case 0:
            if (cnt == (10*20)) //10s sau khi mo may se kich may khi nen
            {
//                OpenOutput(AIR_COMPRESSOR_PIN);
                flagOutput[OPEN_AIR] = 1;
                statusAirCompressor = 1;
                timeOpen = 0;
            }
            break;
        case 1:
            timeOpen = timeOpen + 1;
            if (timeOpen > (5*20))
            {
//                CloseOutput(AIR_COMPRESSOR_PIN);
                flagOutput[OPEN_AIR] = 0;
                statusAirCompressor = 0;
            }
            break;
        default:
            statusAirCompressor = 0;
            break;
    }
}

void SimulateDataSaveFlash(void)
{
    uint16_t i = 0;
    second = 0;
    minute = 0;
    hour = 0;
    date = 1;
    month = 1;
    year = 17;
    FlashEraseAll();
    for (i = 0; i < 50000; i++)
    {
        second = (second + 1)%60;
        if (second == 0)
        {
            minute = (minute + 1)%60;
            if (minute == 0)
            {
                hour = (hour + 1)%24;
                if (hour == 0)
                {
                    date = date + 1;
                }
            }
        }
        SimulateDataSensor();
        PutTimeAndDataToFlash();
    }
}
uint32_t hexToFloat (uint32_t myNumba )
{
    hex2float.hex4 = myNumba;
    return hex2float.f*10;
}

void DigitalIO_Proccess(void)
{
    uint8_t _i = 0, _j, _statusOutput = 0;

    for (_i = 1; _i < NUM_OF_TYPE_OUTPUT; _i++)
    {
        if (flagOutput[_i] == 1)
        {
          for (_j = 0; _j < 8; _j++)  
          {
              if (digitalOutput[_j] == _i)
                  OpenOutput(_j);
          }
        }
        else
        {
            for (_j = 0; _j < 8; _j++)  
          {
              if (digitalOutput[_j] == _i)
                  CloseOutput(_j);
          }
            
        }
    }
    
    for (_i = 1; _i < 8; _i++)
    {
        if (input_code[_i] > 0)
        {
          for (_j = 0; _j < NUM_OF_TYPE_INPUT; _j++)  
          {
              if (digitalInput[_i] == _j)
                  flagInput[_j] = 1;
          }
        }
        else
        {
          for (_j = 0; _j < NUM_OF_TYPE_INPUT; _j++)  
          {
              if (digitalInput[_i] == _j)
                  flagInput[_j] = 0;
          }
        }
    }

}
void DisplayInOut(void)
{
    uint8_t _i = 0;
    for (_i=  0; _i < 8; _i++)
    {
        LcdPrintNumS(9,_i,input_code[_i]%10);
        LcdPrintNumS(9,_i + 9,output_code[_i]%10);
        
    }
}
