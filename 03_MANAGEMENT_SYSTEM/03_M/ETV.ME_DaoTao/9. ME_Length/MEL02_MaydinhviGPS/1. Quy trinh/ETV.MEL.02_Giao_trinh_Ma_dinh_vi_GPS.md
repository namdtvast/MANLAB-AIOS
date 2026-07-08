LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM

**VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG**

🙣🕮🙡

**GIÁO TRÌNH ĐÀO TẠO**

**GIÁO TRÌNH ĐÀO TẠO PHƯƠNG TIỆN ĐO ĐỊNH VỊ BẰNG VỆ TINH**

**TRAINING CURRICULUM FOR SATELLITE POSITIONING (GPS) INSTRUMENTS**

+--------------------+------------------------------------------------------+
| Mã số:             | **ETV.MEL 02**                                       |
+====================+==========================+===========================+
| Lần ban hành:      | **01**                                               |
+--------------------+------------------------------------------------------+
| Ngày ban hành:     | **27/05/2026**                                       |
+--------------------+--------------------------+---------------------------+
| BIÊN SOẠN          | SOÁT XÉT                 | PHÊ DUYỆT                 |
+--------------------+--------------------------+---------------------------+
| **Dương Thành      | **Trần Thị Hoa**         | **Nguyễn Hoàng Giang**    |
| Nam**              |                          |                           |
+--------------------+--------------------------+---------------------------+

**\**

# THEO DÕI SỬA ĐỔI TÀI LIỆU

  ------------------------------------------------------------------------
    **Ngày soát      **Lý do soát xét, ban hành lại**     **Lần ban hành**
       xét**                                              
  --------------- --------------------------------------- ----------------
    27/05/2026    Ban hành mới giáo trình đào tạo phương         01
                   tiện đo định vị bằng vệ tinh GPS/GNSS  

  ------------------------------------------------------------------------

**Giáo trình đào tạo Phương tiện đo định vị bằng vệ tinh (GPS/GNSS)**

**Training curriculum for Satellite Positioning (GPS/GNSS) Instruments**

# 1. Giới thiệu chung

## **1.1. Cơ sở đo lường học**

Hệ thống định vị vệ tinh toàn cầu GNSS là một trong những nền tảng kỹ
thuật quan trọng của hạ tầng đo lường, định vị và đồng bộ thời gian hiện
đại. Công nghệ này cho phép xác định tọa độ không gian, vận tốc và thời
gian của đối tượng đo thông qua quá trình thu nhận, giải mã và xử lý tín
hiệu vô tuyến phát ra từ các vệ tinh nhân tạo chuyển động trên quỹ đạo
trung bình quanh Trái đất. Trong thực tiễn hiện nay, các hệ thống GPS,
GLONASS, GALILEO và BEIDOU có thể được khai thác độc lập hoặc kết hợp
đồng thời nhằm tăng số lượng vệ tinh quan sát, cải thiện hình học vệ
tinh và nâng cao độ ổn định của nghiệm tọa độ.

Về bản chất đo lường học, phương tiện đo định vị bằng vệ tinh không phải
là một thiết bị đơn lẻ mà là một hệ thống đo phức hợp, bao gồm anten thu
tín hiệu, bộ thu GNSS, bộ xử lý dữ liệu, phần mềm tính toán, hệ quy
chiếu tọa độ, mô hình hiệu chỉnh khí quyển và các điều kiện vận hành cụ
thể. Kết quả đo của hệ thống GNSS vì vậy chịu tác động đồng thời của
nhiều nguồn ảnh hưởng, từ sai số quỹ đạo vệ tinh, sai số đồng hồ, độ trễ
tầng điện ly, độ trễ tầng đối lưu, nhiễu đa đường, nhiễu thu nhận tín
hiệu, sai số tâm pha anten đến mô hình xử lý số liệu và năng lực thao
tác của người vận hành \[1\], \[2\].

Nguyên lý định vị GNSS dựa trên phương pháp giao hội nghịch không gian,
trong đó máy thu xác định khoảng cách giả tới các vệ tinh thông qua thời
gian truyền tín hiệu. Khi biết tọa độ vệ tinh trong hệ tọa độ không gian
và đo được khoảng cách giả tới ít nhất bốn vệ tinh, hệ thống có thể giải
đồng thời ba thành phần tọa độ của máy thu và sai số đồng hồ máy thu.
Trong trường hợp đo chính xác cao, đặc biệt với các phương pháp đo pha
sóng mang, bài toán định vị còn phải giải thêm tham số đa trị nguyên
pha, các sai số tương quan theo thời gian và không gian, cũng như các
ràng buộc thống kê của mô hình bình sai.

Trong hoạt động kiểm định, hiệu chuẩn và thử nghiệm, yêu cầu quan trọng
nhất đối với phương tiện đo GNSS là khả năng chứng minh độ đúng, độ lặp
lại, độ ổn định và độ không đảm bảo đo của kết quả đo. Các tài liệu kỹ
thuật quốc tế về kiểm tra hệ thống đo GNSS như ISO 17123-8 nhấn mạnh
việc sử dụng quy trình kiểm tra hiện trường có kiểm soát nhằm đánh giá
chất lượng của hệ thống đo GNSS RTK trong điều kiện vận hành thực tế
\[1\], \[3\]. Đối với Việt Nam, dự thảo quy trình ĐLVN về phương tiện đo
định vị bằng vệ tinh xác định rõ phạm vi kiểm định cho máy thu GNSS theo
chế độ đo điểm đơn và đo RTK, đồng thời định nghĩa các khái niệm cơ bản
như DUT, BASE, ROVER và các hệ thống vệ tinh toàn cầu \[2\].

Một điểm cần nhấn mạnh trong giáo trình này là người học không chỉ được
huấn luyện để thao tác đúng quy trình, mà còn phải hiểu bản chất khoa
học của phép đo. Trong đo lường GNSS, cùng một thiết bị có thể cho kết
quả khác nhau khi điều kiện vệ tinh, điều kiện môi trường, thuật toán xử
lý hoặc phương pháp thiết lập hiện trường thay đổi. Do đó, năng lực
chuyên môn của cán bộ kỹ thuật phải bao gồm khả năng nhận biết nguồn sai
số, lựa chọn phương pháp đo phù hợp, thiết lập cấu hình đo hợp lý, xử lý
số liệu đúng cách và đưa ra kết luận đo lường có căn cứ khoa học.

## **1.2. Phương tiện đo, nguyên lý và công nghệ đo**

Máy thu GNSS hiện đại có thể được phân loại theo mục đích sử dụng, từ
thiết bị dẫn đường dân dụng, thiết bị thu thập dữ liệu GIS, thiết bị bản
đồ, thiết bị trắc địa đa tần số đến các hệ thống đo thời gian và tần số
chuyên dụng. Thiết bị cấp trắc địa thường có khả năng thu đồng thời
nhiều chòm vệ tinh và nhiều tần số, nhờ đó giảm ảnh hưởng của tầng điện
ly, tăng khả năng cố định nghiệm pha và cải thiện độ chính xác trong môi
trường có điều kiện quan sát phức tạp.

Phương pháp đo điểm đơn là phương pháp cơ bản nhất, trong đó một máy thu
độc lập xác định vị trí dựa trên tín hiệu vệ tinh mà không sử dụng trạm
tham chiếu. Phương pháp này phù hợp với các yêu cầu định vị mức mét,
nhưng không đáp ứng các yêu cầu kiểm định hoặc đo lường chính xác cao.
Đối với các ứng dụng kỹ thuật, phương pháp DGPS, RTK, PPK, Static và
Fast Static thường được sử dụng nhằm giảm sai số hệ thống và nâng độ
chính xác từ mức mét xuống mức decimet, centimet hoặc milimet tùy theo
cấu hình đo và điều kiện xử lý \[3\], \[4\].

Trong phương pháp RTK, một trạm Base đặt tại điểm đã biết tọa độ truyền
dữ liệu cải chính cho một hoặc nhiều Rover. Rover sử dụng dữ liệu cải
chính này để giải nghiệm pha thời gian thực, qua đó xác định tọa độ với
độ chính xác cao ngay tại hiện trường. Phương pháp RTK có ưu điểm về tốc
độ và hiệu quả vận hành, nhưng rất nhạy với chiều dài đường đáy, điều
kiện truyền dữ liệu, nhiễu đa đường, số lượng vệ tinh quan sát và khả
năng cố định nghiệm pha. Vì vậy, người vận hành phải thường xuyên theo
dõi trạng thái FIX, số vệ tinh, trị số HDOP/PDOP và các chỉ báo chất
lượng khác.

Phương pháp đo tĩnh và tĩnh nhanh sử dụng dữ liệu quan trắc trong một
khoảng thời gian nhất định, sau đó xử lý hậu kỳ bằng phần mềm chuyên
dụng. Do có thời gian quan trắc dài hơn và mô hình xử lý chặt chẽ hơn,
phương pháp tĩnh thường cho độ chính xác cao và phù hợp với việc xây
dựng lưới khống chế, xác lập mốc chuẩn hoặc kiểm tra đặc tính đo lường
của hệ thống GNSS. Nghiên cứu về phương pháp kiểm tra GNSS bằng định vị
tĩnh tương đối cho thấy cách tiếp cận này có thể hỗ trợ đánh giá không
chỉ độ chụm mà còn cả độ đúng của hệ thống thông qua so sánh với giá trị
danh định của đường đáy chuẩn \[4\].

Mạng lưới CORS và dịch vụ IGS có vai trò quan trọng trong việc nâng cao
tính truy xuất chuẩn của phép đo GNSS. Các trạm tham chiếu hoạt động
liên tục cung cấp dữ liệu quan trắc ổn định, cho phép xử lý dữ liệu theo
phương pháp tương đối hoặc PPP, đồng thời hỗ trợ kiểm tra, hiệu chuẩn và
đánh giá máy thu GPS/GNSS. Một số nghiên cứu quốc tế đã chỉ ra rằng việc
sử dụng kết hợp IGS và CORS có thể làm giảm khối lượng công việc hiệu
chuẩn truyền thống, đồng thời nâng cao hiệu quả đánh giá thiết bị trong
thực tế \[5\].

## **1.3. Các nguồn sai số và kiểm soát chất lượng đo GNSS**

Sai số trong đo GNSS có thể được chia thành các nhóm chính gồm sai số vệ
tinh, sai số truyền sóng, sai số máy thu, sai số anten, sai số môi
trường và sai số thao tác. Sai số vệ tinh bao gồm sai số quỹ đạo và sai
số đồng hồ vệ tinh; sai số truyền sóng bao gồm độ trễ tầng điện ly và
tầng đối lưu; sai số môi trường thường liên quan đến nhiễu đa đường, che
khuất vệ tinh và nhiễu tín hiệu; trong khi sai số thao tác thường phát
sinh từ việc đo sai chiều cao anten, dọi tâm không chính xác hoặc cấu
hình thiết bị không phù hợp.

Tầng điện ly là môi trường phân tán đối với tín hiệu vô tuyến GNSS, do
đó độ trễ điện ly phụ thuộc vào tần số tín hiệu. Máy thu đa tần số có
thể sử dụng tổ hợp tuyến tính của các tín hiệu khác nhau để giảm ảnh
hưởng tầng điện ly, trong khi máy thu một tần số phải dựa vào mô hình
hiệu chỉnh hoặc dữ liệu cải chính từ trạm tham chiếu. Tầng đối lưu không
phân tán đối với các tần số GNSS thông dụng, vì vậy việc hiệu chỉnh
thường dựa trên mô hình khí tượng, góc ngẩng vệ tinh và ước lượng tham
số trễ đối lưu trong quá trình xử lý.

Nhiễu đa đường là hiện tượng tín hiệu vệ tinh đến anten theo nhiều đường
truyền khác nhau do phản xạ từ bề mặt công trình, mặt nước, phương tiện,
cây cối hoặc địa hình xung quanh. Đây là một trong những nguồn sai số
khó kiểm soát nhất trong đo GNSS hiện trường, đặc biệt tại khu vực đô
thị, cảng biển, khu công nghiệp hoặc khu vực có tán cây dày đặc. Kỹ
thuật lựa chọn vị trí thông thoáng, sử dụng anten có khả năng chống đa
đường, tăng góc ngẩng vệ tinh và kéo dài thời gian quan trắc là các biện
pháp thường dùng để giảm ảnh hưởng này.

Các chỉ số DOP, đặc biệt là HDOP và PDOP, phản ánh chất lượng hình học
của chòm vệ tinh quan sát được tại thời điểm đo. Khi các vệ tinh phân bố
đều trên bầu trời, bài toán định vị có điều kiện hình học tốt và sai số
tọa độ được khuếch đại ít hơn. Ngược lại, khi vệ tinh tập trung về một
phía hoặc có số lượng vệ tinh quan sát ít, trị số DOP tăng lên và độ tin
cậy của nghiệm tọa độ giảm. Vì vậy, trong đào tạo kỹ thuật GNSS, người
học phải biết lập kế hoạch đo theo lịch vệ tinh và đánh giá chất lượng
hình học trước, trong và sau khi đo.

Đối với anten GNSS, tâm pha điện tử không trùng tuyệt đối với tâm hình
học của anten và có thể thay đổi theo hướng tới vệ tinh, tần số tín hiệu
và thiết kế anten. Các đại lượng PCO và PCV mô tả độ lệch và biến thiên
tâm pha anten, là thành phần quan trọng trong đo chính xác cao. Khi thực
hiện kiểm tra hoặc hiệu chuẩn hệ thống, việc sử dụng anten khác nhau,
xoay anten không đồng nhất hoặc nhập sai mô hình anten có thể gây sai
lệch hệ thống trong kết quả đo.

Độ không đảm bảo đo của hệ thống GNSS phải được xây dựng trên cơ sở nhận
diện đầy đủ các nguồn ảnh hưởng có ý nghĩa, lượng hóa thành phần độ
không đảm bảo chuẩn, kết hợp theo mô hình phù hợp và nhân với hệ số phủ
để thu được độ không đảm bảo mở rộng. Đối với phép đo GNSS, ngân sách độ
không đảm bảo thường bao gồm thành phần do chuẩn tọa độ hoặc đường đáy
chuẩn, thành phần do độ lặp lại, thành phần do thiết lập anten, thành
phần do môi trường, thành phần do xử lý số liệu và thành phần do thiết
bị cần kiểm tra. Việc chỉ báo độ chính xác theo tài liệu nhà sản xuất
không thể thay thế cho đánh giá độ không đảm bảo đo trong điều kiện sử
dụng thực tế \[6\].

## **1.4. Định hướng đào tạo chuyên sâu và ứng dụng liên ngành**

Hoạt động đào tạo phải được thiết kế theo hướng hình thành năng lực nghề
nghiệp hoàn chỉnh, bao gồm hiểu biết lý thuyết, kỹ năng thao tác hiện
trường, năng lực xử lý số liệu và khả năng đánh giá kết quả theo chuẩn
mực đo lường. Cách tiếp cận này phù hợp với yêu cầu của các hệ thống
quản lý chất lượng phòng thí nghiệm theo ISO/IEC 17025, trong đó năng
lực nhân sự được xem là yếu tố then chốt để bảo đảm giá trị sử dụng của
kết quả đo.

Trong phần lý thuyết, học viên cần được trang bị nền tảng về hệ tọa độ,
hệ quy chiếu, thời gian GNSS, cấu trúc tín hiệu vệ tinh, nguyên lý đo mã
và đo pha, mô hình khoảng cách giả, mô hình pha sóng mang và phương pháp
xử lý số liệu. Các nội dung này cần được trình bày theo logic từ nguyên
lý cơ bản đến ứng dụng kiểm định, hiệu chuẩn, tránh đào tạo thuần túy
theo thao tác phần mềm mà không làm rõ bản chất phép đo.

Trong phần thực hành, học viên phải thực hiện đầy đủ các thao tác thiết
lập thiết bị, đo chiều cao anten, cấu hình tham số đo, lựa chọn hệ tọa
độ, kết nối trạm tham chiếu, thu nhận dữ liệu và ghi chép hiện trường.
Dữ liệu thu được phải được xử lý lại để học viên thấy rõ mối liên hệ
giữa điều kiện đo, thông số vệ tinh, chất lượng tín hiệu và sai số kết
quả. Đây là nội dung quan trọng giúp học viên chuyển từ kỹ năng vận hành
sang năng lực phân tích kỹ thuật.

Một nội dung cần đưa vào chương trình là đọc và phân tích bản tin NMEA,
đặc biệt các câu lệnh GGA, RMC, GSA và GSV. Thông qua các bản tin này,
học viên có thể nhận diện trạng thái định vị, số vệ tinh sử dụng, trị số
HDOP, tọa độ, vận tốc, thời gian UTC và chất lượng nghiệm. Khả năng đọc
dữ liệu thô hoặc dữ liệu bán xử lý giúp cán bộ kỹ thuật không phụ thuộc
hoàn toàn vào giao diện phần mềm, đồng thời phát hiện sớm các bất thường
trong quá trình vận hành.

Đối với các hệ thống GNSS dùng trong đo vận tốc, dẫn đường hoặc kiểm tra
phương tiện giao thông, cần bổ sung kiến thức về nguyên lý xác định vận
tốc bằng Doppler, sai số vận tốc trong môi trường bị che khuất và các
phương pháp lọc ngoại lai. Các nghiên cứu về kiểm tra độ chính xác vận
tốc GPS/GNSS cho thấy các điều kiện thực tế như cầu vượt, tán cây và môi
trường đô thị có thể tạo ra các điểm ngoại lai đáng kể, làm giảm độ tin
cậy nếu không có quy trình kiểm soát dữ liệu phù hợp \[7\].

Xu hướng kỹ thuật hiện nay là tích hợp GNSS với IMU, LiDAR, camera, cảm
biến môi trường và nền tảng IoT nhằm tạo ra các hệ thống định vị và quan
trắc thông minh. Việc tích hợp này mở rộng phạm vi ứng dụng của GNSS
nhưng đồng thời làm tăng yêu cầu về hiệu chuẩn hệ thống, đồng bộ thời
gian, căn chỉnh khung tọa độ và đánh giá độ không đảm bảo đo tổng hợp.
Vì vậy, giáo trình đào tạo GNSS cần đặt trong bối cảnh liên ngành giữa
đo lường, điện tử viễn thông, công nghệ thông tin, tự động hóa và khoa
học dữ liệu.

# 2. Phạm vi áp dụng

Văn bản này quy định nội dung, phương pháp, trình tự và yêu cầu kỹ thuật
đối với hoạt động đào tạo, tập huấn phương tiện đo định vị bằng vệ tinh
GPS/GNSS theo đúng các quy định hiện hành về đo lường, kiểm định, hiệu
chuẩn và quản lý năng lực nhân sự kỹ thuật.

Giáo trình áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi
trường khi tham gia đào tạo, vận hành, kiểm định, hiệu chuẩn hoặc thử
nghiệm các phương tiện đo định vị bằng vệ tinh. Giáo trình cũng có thể
được sử dụng làm tài liệu tham khảo cho các tổ chức, cá nhân hoạt động
trong lĩnh vực đo đạc bản đồ, trắc địa, quan trắc môi trường, hàng hải,
giao thông thông minh và các ứng dụng định vị có yêu cầu đánh giá chất
lượng đo.

Đối tượng đào tạo bao gồm máy thu GNSS đo điểm đơn, máy thu GNSS đo RTK,
hệ thống Base/Rover, anten GNSS, bộ điều khiển dữ liệu, phần mềm xử lý
số liệu, hệ thống kết nối CORS/NTRIP và các phụ kiện kỹ thuật có ảnh
hưởng trực tiếp đến chất lượng phép đo. Phạm vi đo và MPE/LOD cụ thể
được xác định theo tài liệu kỹ thuật của nhà sản xuất, quy trình kiểm
định tương ứng và yêu cầu công nhận năng lực của phòng thí nghiệm.

  -------------------------------------------------------------------------
   **TT**  **Tên đối        **Phạm vi đo**           **MPE / LOD**
           tượng**                                   
  -------- ---------------- ------------------------ ----------------------
     1     Máy thu GNSS đo  Tọa độ không gian; vận   Theo tài liệu kỹ thuật
           điểm đơn         tốc; thời gian           và quy trình kiểm định

     2     Máy thu GNSS RTK Tọa độ thời gian thực;   Theo ISO 17123-8 và
           Base/Rover       đường đáy ngắn đến trung ĐLVN GNSS
                            bình                     

     3     Hệ thống đo tĩnh Lưới khống chế; đường    Theo yêu cầu kỹ thuật
           GNSS             đáy chuẩn; mốc tọa độ    của phép đo

     4     Hệ thống         Dữ liệu cải chính và     Theo yêu cầu vận hành
           CORS/NTRIP       trạm tham chiếu          mạng tham chiếu
  -------------------------------------------------------------------------

# 3. Các bước đào tạo

Hoạt động đào tạo phải được tiến hành theo trình tự từ nhận thức cơ sở
đo lường học đến kỹ năng vận hành thiết bị và năng lực xử lý số liệu.
Cấu trúc chương trình được thiết kế nhằm bảo đảm người học hiểu được bản
chất của phép đo GNSS, không chỉ thao tác theo các bước có sẵn mà còn có
khả năng phân tích, đánh giá và xử lý các tình huống kỹ thuật phát sinh
trong thực tế.

Các bước đào tạo bao gồm học lý thuyết, thực hành thiết lập hiện trường,
thực hành đo RTK và đo tĩnh, xử lý dữ liệu hậu kỳ, đánh giá sai số, lập
báo cáo kết quả và kiểm tra năng lực sau đào tạo. Mỗi module đào tạo
phải gắn với mục tiêu năng lực cụ thể và tiêu chí đánh giá rõ ràng.

Bảng 1

  ----------------------------------------------------------------------------
   **TT**  **Tên phép   **Ký, mã   **Theo điều,    **Diễn giải**   **Ghi chú**
           đo lường**    hiệu**       mục quy                      
                                      trình**                      
  -------- ---------- ------------ ------------- ----------------- -----------
     1     Nhận diện      KTBN        Mục 7.1      Học viên nhận    Lý thuyết
           cấu tạo hệ                              biết máy thu,     và thực
           thống GNSS                             anten, bộ điều      hành
                                                   khiển, nguồn    
                                                   nuôi, cáp tín   
                                                 hiệu, phụ kiện và 
                                                 tài liệu kỹ thuật 
                                                     kèm theo.     

     2     Thiết lập     SETUP      Mục 6, 7.2     Học viên thực    Thực hành
           trạm đo                               hiện dọi tâm, cân 
           hiện                                  bằng máy, đo cao  
           trường                                 anten, chọn vị   
                                                 trí đo, thiết lập 
                                                 góc ngẩng và cấu  
                                                  hình hệ tọa độ.  

     3     Đo điểm      SPP-NMEA      Mục 7.3    Học viên thu nhận  Thực hành
           đơn và đọc                            dữ liệu định vị,  
           dữ liệu                                đọc trạng thái   
           NMEA                                    nghiệm, số vệ   
                                                 tinh, HDOP, thời  
                                                  gian UTC và các  
                                                   câu lệnh GGA,   
                                                  RMC, GSA, GSV.   

     4     Đo động        RTK      ISO 17123-8;   Học viên thiết    Thực hành
           thời gian                 ĐLVN GNSS    lập Base/Rover   hiện trường
           thực RTK                                hoặc kết nối    
                                                 CORS/NTRIP, theo  
                                                  dõi trạng thái   
                                                  FIX và đánh giá  
                                                 chất lượng nghiệm 
                                                      tọa độ.      

     5     Đo tĩnh và    STATIC    ISO 17123-8;   Học viên thu dữ   Thực hành
           tĩnh nhanh               tài liệu xử   liệu RINEX, lựa   và phòng
                                      lý GNSS     chọn thời gian       máy
                                                 đo, xử lý hậu kỳ  
                                                 và bình sai đường 
                                                 đáy hoặc lưới tọa 
                                                        độ.        

     6     Đánh giá       UNC      GUM; ISO/IEC    Học viên nhận     Bài tập
           sai số và                   17025      diện nguồn sai    tính toán
           độ không                              số, xây dựng ngân 
           đảm bảo đo                            sách độ không đảm 
                                                  bảo đo và đánh   
                                                  giá sự phù hợp   
                                                  với yêu cầu kỹ   
                                                      thuật.       
  ----------------------------------------------------------------------------

# 4. Phương tiện phục vụ đào tạo, tập huấn

Các phương tiện dùng để thực hành, đào tạo và tập huấn phải được lựa
chọn phù hợp với mục tiêu đào tạo, phạm vi ứng dụng và yêu cầu kỹ thuật
của từng bài học. Trong đào tạo GNSS, phương tiện phục vụ đào tạo không
chỉ bao gồm máy thu và anten mà còn bao gồm hệ thống chuẩn tọa độ, mốc
kiểm tra, phần mềm xử lý, tài liệu kỹ thuật, phương tiện ghi nhận dữ
liệu và các thiết bị phụ trợ có ảnh hưởng đến chất lượng phép đo.

## **4.1. Chuẩn đo lường (thiết bị)**

  ------------------------------------------------------------------------------
  **TT**   **Tên đối      **Đặc trưng kỹ thuật **Cấp/độ chính   **Liên kết chuẩn
           tượng**        đo lường (Phạm vi    xác (±)**        tới**
                          đo)**                                 
  -------- -------------- -------------------- ---------------- ----------------
  1        Máy thu GNSS   Thu GPS/GLONASS/     Theo chứng chỉ   Mốc tọa độ
           trắc địa đa    GALILEO/BEIDOU; hỗ   hiệu chuẩn hoặc  chuẩn/CORS/IGS
           tần            trợ RTK/Static       tài liệu kỹ      
                                               thuật            

  2        Trạm CORS hoặc Cung cấp dữ liệu cải Theo hồ sơ quản  Hệ tọa độ quốc
           Base chuẩn     chính RTCM/NTRIP     lý trạm chuẩn    gia hoặc mạng
                                                                tham chiếu

  3        Đường đáy      Chiều dài, chênh cao Theo hồ sơ chuẩn Hệ quy chiếu
           chuẩn hoặc mốc hoặc tọa độ đã biết  tọa độ           quốc gia hoặc
           chuẩn                                                chuẩn được công
                                                                nhận

  4        Thiết bị đo    Thước đo cao anten   Theo hiệu chuẩn  Chuẩn độ dài
           chiều cao      hoặc dụng cụ đo      dụng cụ đo chiều 
           anten          chuyên dụng          dài              
  ------------------------------------------------------------------------------

## **4.2. Chuẩn đo lường (mẫu chuẩn)**

Đối với phương tiện đo GNSS, khái niệm mẫu chuẩn được hiểu theo nghĩa
rộng là các giá trị tọa độ chuẩn, đường đáy chuẩn, mốc chuẩn hoặc bộ dữ
liệu tham chiếu đã được thiết lập, đánh giá và quản lý về mặt đo lường.
Các giá trị này được sử dụng làm cơ sở so sánh khi đào tạo học viên về
kiểm tra độ đúng, độ lặp lại và sai số của hệ thống GNSS.

  -----------------------------------------------------------------------------------
   **TT**  **Tên đối       **Giá trị danh    **Độ không đảm bảo  **Liên kết chuẩn
           tượng**         định (Lý          đo (U%, k = 2)**    tới**
                           thuyết)**                             
  -------- --------------- ----------------- ------------------- --------------------
     1     Mốc tọa độ      Tọa độ X, Y, H    Theo hồ sơ mốc      Hệ tọa độ quốc
           chuẩn           hoặc B, L, h      chuẩn               gia/VN-2000/WGS-84

     2     Đường đáy chuẩn Chiều dài đường   Theo hồ sơ kiểm     Chuẩn độ dài và lưới
                           đáy danh định     định/hiệu chuẩn     tọa độ

     3     Bộ dữ liệu      Dữ liệu quan trắc Theo hồ sơ dữ liệu  IGS/CORS hoặc nguồn
           RINEX tham      GNSS đã kiểm soát                     dữ liệu chuẩn
           chiếu                                                 
  -----------------------------------------------------------------------------------

## **4.3. Vật liệu, dụng cụ**

  ---------------------------------------------------------------------------
   **TT**  **Tên đối       **Giá trị danh định **Độ không đảm    **Liên kết
           tượng**         (Lý thuyết)**       bảo đo (U%, k =   chuẩn tới**
                                               2)**              
  -------- --------------- ------------------- ----------------- ------------
     1     Chân máy và đế  Đảm bảo ổn định cơ  Không áp dụng     Kiểm tra kỹ
           dọi tâm         học khi đặt anten   trực tiếp         thuật nội bộ

     2     Bộ nguồn và pin Cấp nguồn ổn định   Không áp dụng     Kiểm tra
           dự phòng        trong quá trình đo  trực tiếp         tình trạng
                                                                 sử dụng

     3     Cáp tín hiệu và Đảm bảo truyền tín  Không áp dụng     Kiểm tra kỹ
           phụ kiện anten  hiệu ổn định        trực tiếp         thuật nội bộ

     4     Máy tính và     Xử lý dữ liệu       Không áp dụng     Kiểm soát
           phần mềm xử lý  RINEX, bình sai,    trực tiếp         phiên bản
                           xuất báo cáo                          phần mềm
  ---------------------------------------------------------------------------

Lưu ý: Tùy thuộc vào từng quy trình đào tạo, giảng viên lựa chọn chuẩn
đo lường, phương tiện phụ và phần mềm xử lý phù hợp, bảo đảm đáp ứng yêu
cầu đào tạo và không làm sai lệch bản chất đo lường của bài thực hành.

# 5. Điều kiện môi trường

Khi thực hành đào tạo phải bảo đảm điều kiện môi trường phù hợp với yêu
cầu kỹ thuật của thiết bị và mục tiêu của bài học. Đối với đo GNSS, môi
trường quan trọng nhất không chỉ là nhiệt độ, độ ẩm và áp suất mà còn là
điều kiện quan sát bầu trời, mức độ che khuất vệ tinh, khả năng phản xạ
tín hiệu và độ ổn định của vị trí đặt anten.

Khu vực thực hành nên được lựa chọn tại nơi thông thoáng, có góc nhìn
bầu trời rộng, tránh gần tường cao, mái kim loại, mặt nước, đường dây
điện cao áp, trạm phát sóng mạnh hoặc khu vực có mật độ vật cản lớn.
Trong trường hợp mục tiêu đào tạo là nhận diện sai số đa đường hoặc kiểm
tra điều kiện đo bất lợi, giảng viên có thể bố trí bài thực hành so sánh
giữa khu vực thông thoáng và khu vực có vật cản để học viên nhận thức rõ
ảnh hưởng của môi trường đến kết quả đo.

  -----------------------------------------------------------------------
  **Tên đối tượng** **Nhiệt độ**      **Độ ẩm**         **Áp suất**
  ----------------- ----------------- ----------------- -----------------
  Máy thu GNSS và   Theo tài liệu kỹ  Theo tài liệu kỹ  Điều kiện khí
  anten             thuật của nhà sản thuật của nhà sản quyển ổn định,
                    xuất              xuất              ghi nhận khi cần

  Khu vực đo thực   Không mưa lớn,    Không đọng nước   Ghi nhận khi phục
  hành              không giông sét,  trên đầu nối và   vụ tính toán khí
                    hạn chế rung động anten             quyển

  Thiết bị phụ trợ  Theo điều kiện    Tránh ẩm ướt gây  Không yêu cầu
                    vận hành thiết bị hư hỏng kết nối   riêng
  -----------------------------------------------------------------------

# 6. Chuẩn bị đào tạo, tập huấn

Trước khi tiến hành đào tạo, giảng viên phải lập kế hoạch đào tạo chi
tiết, xác định mục tiêu của từng buổi học, danh mục thiết bị sử dụng, vị
trí mốc đo, phương pháp đo, tiêu chí đánh giá và dữ liệu cần thu thập.
Kế hoạch đào tạo cần được xây dựng sao cho học viên có thể liên hệ giữa
kiến thức lý thuyết, thao tác hiện trường và kết quả xử lý số liệu.

Công tác chuẩn bị thiết bị bao gồm kiểm tra tình trạng vật lý của máy
thu, anten, cáp tín hiệu, bộ điều khiển, pin, bộ sạc, chân máy, đế dọi
tâm và dụng cụ đo chiều cao anten. Các thiết bị phải được kiểm tra nguồn
nuôi, khả năng khởi động, khả năng thu vệ tinh, khả năng ghi dữ liệu và
kết nối với phần mềm xử lý trước khi đưa vào buổi đào tạo.

Công tác chuẩn bị dữ liệu bao gồm kiểm tra lịch vệ tinh, dự kiến trị số
DOP, lựa chọn góc ngẩng vệ tinh, xác định hệ tọa độ sử dụng, chuẩn bị
thông tin mốc chuẩn và cấu hình kết nối CORS/NTRIP nếu bài thực hành sử
dụng mạng trạm tham chiếu. Đối với bài xử lý hậu kỳ, cần chuẩn bị phần
mềm, bộ dữ liệu RINEX mẫu và hướng dẫn chuyển đổi định dạng dữ liệu.

Trước khi đo, giảng viên cần nhấn mạnh cho học viên các lỗi thao tác
thường gặp như nhập sai chiều cao anten, chọn sai kiểu anten, sai hệ tọa
độ, sai đơn vị đo, sai cổng truyền dữ liệu, không kiểm tra trạng thái
FIX hoặc không ghi chép đầy đủ điều kiện hiện trường. Những lỗi này có
thể tạo ra sai số hệ thống lớn hơn nhiều so với sai số ngẫu nhiên của
thiết bị.

# 7. Tiến hành hướng dẫn đào tạo, tập huấn

## **7.1. Hướng dẫn kiểm tra bên ngoài**

Hướng dẫn học viên kiểm tra bên ngoài để xác định sự phù hợp của hệ
thống GNSS đối với các yêu cầu quy định trong tài liệu kỹ thuật. Nội
dung kiểm tra bao gồm tình trạng hình dáng, kích thước, nhãn hiệu, số
sê-ri, tình trạng đầu nối, cổng truyền dữ liệu, nguồn nuôi, màn hình
hiển thị, anten, cáp tín hiệu, chân máy, đế dọi tâm và phụ kiện kèm
theo.

Việc kiểm tra bên ngoài có ý nghĩa quan trọng vì nhiều sai lệch trong đo
GNSS không xuất phát từ thuật toán xử lý mà từ tình trạng cơ học hoặc
kết nối của thiết bị. Anten bị nứt, cáp tín hiệu lỏng, chân máy không ổn
định hoặc đế dọi tâm lệch đều có thể làm suy giảm chất lượng tín hiệu và
tạo sai số trong kết quả đo. Học viên phải được hướng dẫn ghi nhận đầy
đủ tình trạng thiết bị trước khi thực hành.

## **7.2. Hướng dẫn kiểm tra kỹ thuật**

Hướng dẫn học viên kiểm tra trạng thái hoạt động bình thường của hệ
thống theo hướng dẫn sử dụng của nhà sản xuất. Nội dung kiểm tra bao gồm
khởi động thiết bị, thiết lập ngôn ngữ và đơn vị đo, kiểm tra phiên bản
firmware, kiểm tra bộ nhớ, cấu hình cổng truyền dữ liệu, kiểm tra kết
nối Bluetooth, UHF hoặc Internet và xác nhận khả năng thu nhận tín hiệu
từ các chòm vệ tinh.

Trong bài thực hành RTK, học viên phải kiểm tra trạng thái kết nối giữa
Base và Rover hoặc giữa Rover và mạng CORS. Các thông số cần theo dõi
gồm trạng thái FIX/FLOAT, số vệ tinh sử dụng, độ trễ dữ liệu cải chính,
cường độ tín hiệu, trị số HDOP/PDOP và tỷ lệ mất tín hiệu. Nếu hệ thống
không đạt trạng thái ổn định, học viên phải xác định nguyên nhân trước
khi ghi nhận kết quả đo.

Trong bài thực hành đo tĩnh, học viên phải kiểm tra tốc độ ghi dữ liệu,
định dạng dữ liệu, thời gian bắt đầu và kết thúc quan trắc, tên điểm đo,
chiều cao anten, kiểu anten và chế độ theo dõi tín hiệu. Sau khi kết
thúc đo, dữ liệu phải được sao lưu và chuyển đổi sang định dạng RINEX
nếu cần thiết để phục vụ xử lý hậu kỳ.

## **7.3. Hướng dẫn kiểm tra đo lường**

Hướng dẫn học viên kiểm tra đo lường theo đúng tuần tự của quy trình.
Đối với phép đo RTK, học viên tiến hành đặt Rover tại các điểm kiểm tra
đã biết tọa độ, đo lặp nhiều lần trong điều kiện FIX ổn định và so sánh
kết quả với giá trị chuẩn. Sai số tọa độ được xác định trên cơ sở chênh
lệch giữa kết quả đo và giá trị tham chiếu, đồng thời đánh giá độ lặp
lại và độ phân tán của các lần đo.

Đối với phép đo tĩnh, học viên thu dữ liệu tại hai hoặc nhiều điểm trong
khoảng thời gian phù hợp, xử lý đường đáy bằng phần mềm chuyên dụng và
so sánh kết quả với giá trị danh định. Kết quả xử lý phải được đánh giá
thông qua sai số khép, số dư, độ lệch chuẩn, nghiệm cố định đa trị và
các chỉ báo thống kê do phần mềm cung cấp. Trường hợp kết quả không đạt
yêu cầu, học viên phải phân tích nguyên nhân dựa trên dữ liệu vệ tinh,
điều kiện hiện trường và cấu hình xử lý.

Đối với kiểm tra dữ liệu NMEA, học viên trích xuất các bản tin GGA, RMC,
GSA và GSV để đánh giá trạng thái định vị, thời gian UTC, số vệ tinh,
chỉ số HDOP, vận tốc và chất lượng nghiệm. Nội dung này giúp học viên
hiểu rõ mối quan hệ giữa dữ liệu thô, dữ liệu hiển thị trên thiết bị và
kết quả báo cáo đo lường.

Kết quả kiểm tra đo lường phải được lập thành biên bản, trong đó nêu rõ
thiết bị sử dụng, điều kiện môi trường, phương pháp đo, dữ liệu chuẩn,
kết quả đo, sai số, độ không đảm bảo đo và kết luận đạt hoặc không đạt
theo tiêu chí đào tạo. Việc lập biên bản không chỉ phục vụ đánh giá học
viên mà còn rèn luyện tác phong kỹ thuật và khả năng truy xuất dữ liệu
trong hoạt động kiểm định, hiệu chuẩn.

Xu hướng sử dụng chứng chỉ số, mã QR, cơ sở dữ liệu đo lường và phần mềm
quản lý phòng thí nghiệm làm tăng yêu cầu chuẩn hóa dữ liệu GNSS. Người
học cần được giới thiệu nguyên tắc ghi nhận metadata, định dạng dữ liệu,
liên kết hồ sơ thiết bị và quản lý trạng thái kết quả nhằm phục vụ truy
xuất nguồn gốc và minh bạch kỹ thuật.

Khi GNSS tích hợp với nền tảng quan trắc môi trường hoặc quản lý phương
tiện, dữ liệu định vị có vai trò gắn kết kết quả đo với không gian và
thời gian. Vì vậy, lỗi tọa độ, lỗi thời gian hoặc lỗi đồng bộ có thể ảnh
hưởng trực tiếp đến chất lượng dữ liệu quan trắc. Giáo trình GNSS cần
trang bị cho học viên khả năng kiểm tra tính hợp lý của dữ liệu định vị
trong các hệ thống tích hợp.

Khi GNSS tích hợp với IMU, bài toán kỹ thuật không chỉ là xác định tọa
độ mà còn là đồng bộ thời gian, căn chỉnh hệ trục, xác định độ lệch giữa
tâm anten và tâm cảm biến, cũng như đánh giá sự lan truyền độ không đảm
bảo đo trong toàn bộ hệ thống. Nếu không hiệu chuẩn tham số tích hợp, hệ
thống có thể cho kết quả có vẻ ổn định nhưng sai lệch hệ thống trong ứng
dụng thực tế.

GNSS ngày càng được tích hợp sâu với các hệ thống số như bản đồ số, IoT,
cảm biến môi trường, camera, LiDAR, IMU và nền tảng quản lý dữ liệu thời
gian thực. Trong bối cảnh chuyển đổi số hoạt động đo lường, cán bộ kỹ
thuật cần hiểu cách dữ liệu GNSS được tạo ra, truyền đi, lưu trữ, kiểm
tra và sử dụng trong các hệ thống phần mềm.

**7.3.8. Đào tạo về xu hướng tích hợp GNSS với hệ thống số**

Trong hoạt động đào tạo, giảng viên cần yêu cầu học viên nêu rõ phạm vi
sử dụng của kết quả trong từng bài thực hành. Cách tiếp cận này giúp
hình thành tư duy đo lường đúng đắn: kết quả đo chỉ có giá trị khi đi
kèm phương pháp đo, điều kiện đo, độ không đảm bảo đo và giới hạn áp
dụng.

Kết quả GNSS có giới hạn sử dụng rõ ràng. Một kết quả đo được thực hiện
bằng máy cầm tay dân dụng không thể được diễn giải như kết quả đo trắc
địa chính xác cao; một kết quả RTK trong môi trường đô thị nhiều nhiễu
không thể được sử dụng như bằng chứng kỹ thuật nếu không có kiểm tra độc
lập; một tọa độ thu được trong hệ WGS-84 không thể tự động xem là tương
đương VN-2000 nếu chưa có phép chuyển đổi phù hợp. Việc đào tạo phải
giúp học viên nhận thức rõ các giới hạn này.

Về đạo đức nghề nghiệp, người thực hiện đo GNSS phải báo cáo trung thực
điều kiện đo, kết quả đo và các yếu tố có thể ảnh hưởng đến độ tin cậy.
Không được loại bỏ dữ liệu bất lợi nếu không có căn cứ kỹ thuật, không
được sửa số liệu để đạt yêu cầu và không được sử dụng kết quả ngoài phạm
vi đã được đánh giá. Đây là yêu cầu căn bản đối với hoạt động đo lường
có liên quan đến pháp lý, kiểm định, hiệu chuẩn hoặc nghiệm thu kỹ
thuật.

Hoạt động GNSS thường được thực hiện ngoài hiện trường, do đó yêu cầu an
toàn lao động phải được đưa vào chương trình đào tạo. Học viên cần biết
cách bố trí thiết bị tại khu vực giao thông, công trình, bờ sông, khu
vực có thiết bị điện hoặc khu vực có nguy cơ thời tiết cực đoan. Không
được đặt anten, chân máy hoặc cáp tín hiệu ở vị trí gây nguy hiểm cho
người vận hành và cộng đồng.

**7.3.7. Đào tạo về an toàn, đạo đức nghề nghiệp và giới hạn sử dụng kết
quả**

Đào tạo quản lý dữ liệu giúp học viên hiểu rằng chất lượng của một phép
đo không kết thúc tại thời điểm thiết bị hiển thị tọa độ. Chất lượng chỉ
được bảo đảm khi toàn bộ chuỗi dữ liệu từ hiện trường đến báo cáo được
kiểm soát, lưu trữ và có thể kiểm tra lại khi cần thiết.

Khi tích hợp kết quả GNSS vào phần mềm quản lý đo lường hoặc nền tảng
chứng chỉ số, cần bảo đảm rằng dữ liệu đầu vào, dữ liệu xử lý và kết quả
cuối cùng có mối liên kết logic rõ ràng. Các trường dữ liệu như mã thiết
bị, mã phép đo, thời gian đo, người thực hiện, tệp dữ liệu và kết luận
kỹ thuật phải được chuẩn hóa để tránh sai lệch do nhập liệu thủ công
hoặc mất thông tin khi chuyển đổi định dạng.

Trong môi trường phòng thí nghiệm hoặc tổ chức kiểm định, dữ liệu GNSS
phải được quản lý theo nguyên tắc toàn vẹn, truy xuất được và có kiểm
soát phiên bản. Dữ liệu gốc không nên bị ghi đè sau khi xử lý; mọi thay
đổi về cấu hình, hệ tọa độ hoặc mô hình xử lý cần được ghi nhận. Điều
này phù hợp với yêu cầu chung của hệ thống quản lý chất lượng về kiểm
soát hồ sơ kỹ thuật và bảo đảm giá trị sử dụng của kết quả đo.

Một phép đo GNSS có giá trị đo lường không chỉ cần kết quả tọa độ mà còn
cần hồ sơ đầy đủ chứng minh điều kiện tạo ra kết quả đó. Hồ sơ tối thiểu
bao gồm thông tin thiết bị, số sê-ri, anten, kiểu anten, chiều cao
anten, vị trí mốc, thời gian đo, phương pháp đo, cấu hình đo, điều kiện
môi trường, dữ liệu thô, dữ liệu xử lý, phần mềm sử dụng và người thực
hiện.

**7.3.6. Đào tạo về quản lý dữ liệu, hồ sơ và truy xuất kết quả**

Kết luận đạt hoặc không đạt phải gắn với quy tắc quyết định đã được xác
định. Nếu sai số đo gần giới hạn MPE, việc bỏ qua độ không đảm bảo đo có
thể dẫn đến kết luận sai. Vì vậy, học viên cần được đào tạo cách trình
bày kết quả dưới dạng giá trị đo, sai số, độ không đảm bảo đo mở rộng và
căn cứ đánh giá sự phù hợp.

Sau khi có độ không đảm bảo chuẩn tổng hợp, độ không đảm bảo mở rộng
thường được tính với hệ số phủ k = 2 khi có thể giả định mức tin cậy xấp
xỉ 95 %. Tuy nhiên, trong trường hợp số bậc tự do hiệu dụng thấp hoặc dữ
liệu thống kê hạn chế, cần cân nhắc hệ số phủ phù hợp theo phương pháp
Welch-Satterthwaite hoặc hướng dẫn tương ứng. Nội dung này đặc biệt quan
trọng đối với phòng thí nghiệm cần công bố năng lực đo và hiệu chuẩn.

Trong bài đào tạo nâng cao, học viên cần được hướng dẫn phân biệt thành
phần loại A và loại B. Thành phần loại A được đánh giá bằng thống kê từ
các lần đo lặp, trong khi thành phần loại B được đánh giá từ chứng chỉ
hiệu chuẩn, tài liệu kỹ thuật, kinh nghiệm, mô hình hoặc dữ liệu tham
chiếu. Việc xác định phân bố xác suất phù hợp cho từng thành phần là
điều kiện cần để tính toán đúng độ không đảm bảo đo.

Trong bài đào tạo cơ bản, ngân sách độ không đảm bảo đo có thể bao gồm
các thành phần chính như độ không đảm bảo của mốc chuẩn, độ lặp lại kết
quả đo, sai số đo chiều cao anten, ảnh hưởng của dọi tâm, ảnh hưởng môi
trường, ảnh hưởng xử lý số liệu và độ phân giải hiển thị. Mỗi thành phần
cần được chuyển về độ không đảm bảo chuẩn trước khi kết hợp theo phương
pháp căn bậc hai tổng bình phương nếu các thành phần độc lập hợp lý.

Độ không đảm bảo đo là nội dung cốt lõi để chuyển kết quả thực hành GNSS
thành kết quả đo lường có giá trị khoa học. Học viên cần hiểu rằng sai
số là độ lệch giữa kết quả đo và giá trị tham chiếu, trong khi độ không
đảm bảo đo biểu thị mức độ phân tán hợp lý của các giá trị có thể quy
cho đại lượng đo. Hai khái niệm này liên quan với nhau nhưng không đồng
nhất và không được sử dụng thay thế tùy tiện.

**7.3.5. Đào tạo về tính toán sai số và độ không đảm bảo đo**

Đối với hoạt động kiểm định và hiệu chuẩn, bản tin NMEA có thể được sử
dụng như một nguồn dữ liệu phụ để kiểm tra trạng thái của thiết bị trong
quá trình đo, nhưng không thay thế cho dữ liệu xử lý chính thức nếu quy
trình yêu cầu dữ liệu RINEX hoặc dữ liệu đo chuyên dụng. Giá trị của
NMEA nằm ở khả năng giám sát vận hành và hỗ trợ truy vết sự kiện kỹ
thuật.

Khi đào tạo về dữ liệu NMEA, cần yêu cầu học viên liên hệ giữa dữ liệu
hiển thị trên máy, dữ liệu ghi trong tệp và kết quả báo cáo. Việc này
đặc biệt hữu ích đối với các hệ thống tích hợp GNSS trong quan trắc môi
trường, giám sát phương tiện, đo vận tốc hoặc truyền dữ liệu tự động về
phần mềm quản lý. Nếu người vận hành không hiểu dữ liệu gốc, việc phát
hiện lỗi hệ thống sau khi tích hợp sẽ khó khăn hơn nhiều.

Khả năng đọc bản tin NMEA giúp học viên phát hiện những bất thường mà
giao diện phần mềm có thể che giấu hoặc trình bày quá đơn giản. Ví dụ,
số vệ tinh quan sát nhiều nhưng số vệ tinh sử dụng trong nghiệm ít có
thể cho thấy chất lượng tín hiệu không ổn định; HDOP thấp nhưng trạng
thái nghiệm không ổn định có thể liên quan đến dữ liệu cải chính hoặc đa
trị pha; vận tốc bất thường trong điều kiện đứng yên có thể phản ánh
nhiễu tín hiệu hoặc lỗi xử lý.

Bản tin NMEA là nguồn dữ liệu quan trọng giúp kiểm tra nhanh trạng thái
hoạt động của máy thu GNSS. Trong đào tạo, học viên cần được giới thiệu
cấu trúc cơ bản của các câu lệnh GGA, RMC, GSA và GSV, trong đó GGA
thường chứa thông tin tọa độ, thời gian UTC, trạng thái định vị, số vệ
tinh và HDOP; RMC cung cấp thông tin vị trí, vận tốc và thời gian; GSA
phản ánh chế độ định vị và DOP; GSV mô tả vệ tinh quan sát được và cường
độ tín hiệu.

**7.3.4. Đào tạo về phân tích bản tin NMEA và dữ liệu hiện trường**

Kết quả đo tĩnh sau xử lý phải được so sánh với giá trị tham chiếu và
đánh giá theo tiêu chí đã xác định trước. Nếu mục tiêu là kiểm tra hệ
thống, cần phân biệt rõ độ chụm của các lần đo và độ đúng so với giá trị
chuẩn. Một hệ thống có thể cho kết quả lặp lại tốt nhưng vẫn sai lệch hệ
thống nếu giá trị anten, hệ tọa độ hoặc mô hình xử lý bị khai báo sai.

Trong các bài thực hành nâng cao, giảng viên nên cho học viên xử lý cùng
một bộ dữ liệu với các cấu hình khác nhau, chẳng hạn thay đổi góc ngẩng,
mô hình anten, loại lịch vệ tinh hoặc chiến lược xử lý khí quyển. Cách
đào tạo này giúp học viên nhận thức rõ tác động của giả định xử lý đến
kết quả tọa độ, từ đó hình thành tư duy thận trọng khi kết luận về chất
lượng phép đo.

Bình sai dữ liệu GNSS không chỉ là thao tác phần mềm mà là quá trình
đánh giá sự phù hợp của mô hình đo với dữ liệu quan trắc. Học viên phải
biết đọc các chỉ báo như nghiệm fixed/float, ratio, sai số trung phương,
số dư quan trắc, sai số khép hình học và độ lệch tọa độ sau bình sai.
Nếu chỉ dựa vào kết quả cuối cùng mà không phân tích quá trình xử lý,
các sai lệch do nhập sai anten, sai chiều cao anten hoặc sai hệ tọa độ
có thể bị bỏ sót.

Đo tĩnh GNSS là phương pháp có ý nghĩa quan trọng trong kiểm tra và hiệu
chuẩn hệ thống vì cho phép sử dụng dữ liệu quan trắc dài hơn, mô hình xử
lý chặt chẽ hơn và đánh giá được các tham số thống kê của nghiệm. Trong
đào tạo, học viên cần được hướng dẫn từ bước đặt tên điểm, khai báo
chiều cao anten, chọn khoảng ghi dữ liệu, xuất dữ liệu RINEX đến xử lý
đường đáy và bình sai mạng lưới.

**7.3.3. Đào tạo về xử lý dữ liệu đo tĩnh và bình sai**

Trong báo cáo thực hành RTK, học viên phải trình bày rõ cấu hình đo,
loại dữ liệu cải chính, hệ tọa độ, chiều cao anten, số lần đo, trị số
trung bình, độ lệch chuẩn và sai số so với giá trị tham chiếu. Việc báo
cáo đầy đủ giúp chuyển kết quả đo từ mức thao tác kỹ thuật sang mức kết
quả đo lường có khả năng kiểm tra và truy xuất.

Khi sử dụng mạng CORS, độ tin cậy của kết quả phụ thuộc vào chất lượng
mạng tham chiếu, mô hình hiệu chỉnh, kết nối Internet và khoảng cách
tương đương từ Rover tới trạm tham chiếu. Học viên cần được giải thích
rằng CORS không phải là một nguồn cải chính tuyệt đối không có sai số;
bản thân trạm CORS cũng cần được quản lý tọa độ, đồng bộ thời gian, kiểm
tra anten và giám sát chất lượng dữ liệu liên tục.

Chất lượng nghiệm RTK cần được đánh giá đồng thời bằng nhiều chỉ tiêu
thay vì chỉ dựa vào trạng thái FIX. Một nghiệm FIX trong môi trường
nhiễu đa đường mạnh vẫn có thể tạo sai số đáng kể. Vì vậy, cần kiểm tra
số vệ tinh, trị số HDOP/PDOP, độ tuổi dữ liệu cải chính, tỷ lệ mất tín
hiệu, biến động tọa độ lặp lại và sự phù hợp với mốc kiểm tra độc lập.
Trong đào tạo thực hành, học viên nên được yêu cầu đo lặp cùng một điểm
tại các thời điểm khác nhau để quan sát sự biến động của kết quả.

Trong đo RTK, trạng thái nghiệm là chỉ báo quan trọng phản ánh mức độ
tin cậy của kết quả tọa độ. Nghiệm FIX thường thể hiện việc giải thành
công đa trị nguyên pha sóng mang, trong khi nghiệm FLOAT cho thấy hệ
thống chưa cố định được đa trị nguyên hoặc điều kiện dữ liệu chưa đủ
tốt. Học viên phải được hướng dẫn không sử dụng kết quả FLOAT cho các
bài đo yêu cầu độ chính xác cao nếu quy trình hoặc tiêu chí kỹ thuật
không cho phép.

**7.3.2. Đào tạo về xử lý số liệu RTK và kiểm soát trạng thái nghiệm**

Đối với bài đo kiểm tra thiết bị, thiết kế bài đo cần bảo đảm có giá trị
tham chiếu đủ tin cậy để so sánh. Giá trị tham chiếu có thể là tọa độ
mốc chuẩn, chiều dài đường đáy chuẩn, dữ liệu từ trạm CORS được quản lý
tốt hoặc kết quả đo bằng hệ thống chuẩn có độ không đảm bảo đo nhỏ hơn
đáng kể so với đối tượng cần đánh giá. Nếu giá trị tham chiếu không rõ
ràng, kết luận đạt hoặc không đạt sẽ thiếu căn cứ đo lường.

Khi thiết kế một bài đo tĩnh, học viên phải xác định thời gian quan trắc
tối thiểu, khoảng ghi dữ liệu, mô hình anten, chế độ thu tín hiệu, điều
kiện vệ tinh và yêu cầu xử lý hậu kỳ. Đối với đường đáy dài hoặc môi
trường khí quyển biến động, thời gian quan trắc cần được tăng lên để
nâng cao độ tin cậy của nghiệm. Việc đào tạo phải giúp học viên hiểu mối
quan hệ giữa thời gian quan trắc, số vệ tinh, điều kiện hình học và độ
không đảm bảo đo của kết quả.

Khi thiết kế một bài đo RTK, học viên phải xác định rõ điểm đặt Base,
điểm đo Rover, chiều dài đường đáy, phương thức truyền dữ liệu cải
chính, hệ tọa độ sử dụng, góc ngẩng vệ tinh và tiêu chí chấp nhận nghiệm
FIX. Những thông tin này phải được ghi trong nhật ký hiện trường để bảo
đảm khả năng truy xuất và tái lập phép đo. Nếu sử dụng mạng CORS, học
viên cần hiểu sự khác biệt giữa trạm vật lý đơn, trạm ảo VRS và các mô
hình hiệu chỉnh mạng khác.

Việc lựa chọn phương pháp đo GNSS phải xuất phát từ mục tiêu kỹ thuật
của phép đo, yêu cầu độ chính xác, điều kiện hiện trường, thời gian cho
phép và năng lực xử lý số liệu. Trong đào tạo, học viên cần hiểu rằng
không có một phương pháp đo duy nhất phù hợp cho mọi tình huống; đo điểm
đơn phù hợp với yêu cầu định vị sơ bộ, RTK phù hợp với nhu cầu nhận kết
quả nhanh tại hiện trường, trong khi đo tĩnh và xử lý hậu kỳ phù hợp với
yêu cầu kiểm soát độ chính xác cao và đánh giá đặc tính đo lường của hệ
thống.

**7.3.1. Đào tạo về thiết kế bài đo và lựa chọn phương pháp đo**

Đánh giá năng lực không nên chỉ thực hiện một lần tại cuối khóa mà cần
được duy trì thông qua giám sát định kỳ, so sánh kết quả giữa các kỹ
thuật viên, tham gia thử nghiệm thành thạo hoặc kiểm tra nội bộ. Đối với
lĩnh vực GNSS, nơi công nghệ và phần mềm thay đổi nhanh, giám sát năng
lực liên tục là điều kiện quan trọng để bảo đảm chất lượng lâu dài.

Kết quả đánh giá năng lực phải được lưu trong hồ sơ đào tạo và là căn cứ
phân công công việc. Nếu học viên chưa đạt ở nội dung nào, cần đào tạo
bổ sung đúng nội dung đó thay vì đào tạo lại chung chung. Việc quản lý
năng lực theo từng kỹ năng cụ thể giúp tổ chức sử dụng nhân sự hiệu quả
và đáp ứng yêu cầu của hệ thống quản lý chất lượng.

Các tiêu chí đánh giá nên được lượng hóa ở mức phù hợp, bao gồm thời
gian thiết lập thiết bị, mức độ đúng của cấu hình, độ đầy đủ của ghi
chép hiện trường, chất lượng dữ liệu thu được, khả năng phát hiện lỗi và
độ chính xác của phần xử lý số liệu. Đối với cán bộ dự kiến tham gia
kiểm định hoặc hiệu chuẩn, yêu cầu đánh giá phải cao hơn so với người
chỉ vận hành thiết bị trong ứng dụng thông thường.

Đánh giá năng lực sau đào tạo phải phản ánh đúng khả năng làm việc thực
tế của học viên. Ngoài bài kiểm tra lý thuyết, cần có bài thực hành yêu
cầu học viên tự chuẩn bị thiết bị, thiết lập bài đo, thực hiện đo, xử lý
số liệu, tính sai số, đánh giá độ không đảm bảo đo và lập báo cáo. Cách
đánh giá này giúp phân biệt giữa người chỉ nhớ quy trình và người có
năng lực vận dụng quy trình.

**7.3.12. Đào tạo về đánh giá năng lực sau đào tạo**

Kỹ năng lập báo cáo cũng giúp học viên nâng cao năng lực giao tiếp kỹ
thuật với khách hàng, cơ quan quản lý và chuyên gia đánh giá công nhận.
Một kết quả đo có chất lượng nhưng báo cáo không rõ ràng sẽ khó được
chấp nhận trong hoạt động kiểm định, hiệu chuẩn hoặc nghiệm thu kỹ
thuật.

Một báo cáo GNSS tốt phải có khả năng được người khác kiểm tra lại. Điều
này đòi hỏi các tệp dữ liệu thô, tệp xử lý, thông tin thiết bị, ảnh hiện
trường, nhật ký đo và kết quả tính toán phải được liên kết hoặc lưu trữ
có kiểm soát. Trong môi trường phần mềm quản lý đo lường, các thông tin
này nên được số hóa và gắn với mã hồ sơ để phục vụ tra cứu sau này.

Trong đào tạo, học viên cần được hướng dẫn cách trình bày kết quả đo
theo ngôn ngữ đo lường chuẩn mực. Ví dụ, khi nêu sai số tọa độ, cần chỉ
rõ sai số theo từng thành phần hoặc sai số mặt bằng; khi nêu độ không
đảm bảo đo, cần chỉ rõ hệ số phủ và mức tin cậy; khi kết luận đạt hoặc
không đạt, cần nêu quy tắc quyết định và giới hạn kỹ thuật áp dụng.

Báo cáo kỹ thuật là sản phẩm cuối cùng của quá trình đo và xử lý số liệu
GNSS. Một báo cáo đạt yêu cầu phải thể hiện đầy đủ mục đích đo, đối
tượng đo, thiết bị sử dụng, phương pháp đo, điều kiện môi trường, dữ
liệu chuẩn, kết quả đo, sai số, độ không đảm bảo đo và kết luận. Báo cáo
không nên chỉ trình bày tọa độ cuối cùng mà phải chứng minh được cơ sở
tạo ra tọa độ đó.

**7.3.11. Đào tạo về lập báo cáo kỹ thuật và trình bày kết quả đo**

Đào tạo kiểm soát ngoại lai giúp học viên tránh hai sai lầm đối lập: một
là chấp nhận mọi dữ liệu do thiết bị xuất ra mà không kiểm tra, hai là
loại bỏ dữ liệu không thuận lợi mà không có căn cứ. Cả hai cách làm đều
không phù hợp với nguyên tắc đo lường khoa học và có thể làm giảm độ tin
cậy của kết quả.

Trong đo vận tốc bằng GNSS, ngoại lai có thể xuất hiện dưới dạng xung
vận tốc bất thường khi phương tiện đi qua cầu vượt, khu vực tán cây hoặc
môi trường phản xạ mạnh. Các nghiên cứu thực nghiệm cho thấy một số chỉ
báo như HDOP hoặc số vệ tinh không phải lúc nào cũng đủ để phát hiện tất
cả ngoại lai, do đó cần kết hợp nhiều tiêu chí kiểm soát dữ liệu \[7\].

Việc nhận diện ngoại lai không nên chỉ dựa vào cảm tính mà cần kết hợp
giữa kiểm tra thống kê và phân tích nguyên nhân kỹ thuật. Học viên có
thể sử dụng đồ thị tọa độ theo thời gian, đồ thị sai số so với mốc
chuẩn, kiểm tra độ lệch chuẩn, kiểm tra sự thay đổi HDOP, số vệ tinh và
trạng thái nghiệm. Khi một điểm dữ liệu bị loại bỏ, lý do loại bỏ phải
được ghi nhận rõ ràng trong hồ sơ xử lý.

Dữ liệu GNSS trong thực tế có thể xuất hiện các giá trị ngoại lai do mất
tín hiệu, đa đường, chuyển trạng thái nghiệm, lỗi truyền dữ liệu cải
chính, nhiễu điện từ hoặc thao tác hiện trường. Nếu không phát hiện và
xử lý phù hợp, các giá trị ngoại lai có thể làm sai lệch trung bình,
tăng độ lệch chuẩn và dẫn đến kết luận kỹ thuật không đúng. Vì vậy, đào
tạo về kiểm soát ngoại lai là nội dung cần thiết trong chương trình
chuyên sâu.

**7.3.10. Đào tạo về kiểm soát ngoại lai và đánh giá dữ liệu bất
thường**

Khi lập báo cáo đo lường, hệ tọa độ phải được ghi rõ cùng với các tham
số chuyển đổi đã sử dụng. Không nên chỉ ghi kết quả X, Y, H hoặc B, L, h
mà không nêu hệ quy chiếu, múi chiếu và mô hình độ cao. Việc thiếu thông
tin này làm giảm khả năng truy xuất và có thể gây hiểu sai khi kết quả
được sử dụng bởi đơn vị khác.

Trong bài thực hành, giảng viên nên cung cấp cùng một bộ tọa độ GNSS và
yêu cầu học viên chuyển đổi sang các hệ khác nhau, sau đó phân tích sự
khác biệt. Bài tập này giúp người học nhận thức rằng độ chính xác thiết
bị chỉ là một phần của chất lượng kết quả; chất lượng cuối cùng còn phụ
thuộc vào chuỗi xử lý tọa độ và sự phù hợp của hệ quy chiếu với mục đích
sử dụng.

Học viên cần hiểu rằng chuyển đổi tọa độ không phải là thao tác hình
thức trong phần mềm mà là một bước kỹ thuật có thể làm thay đổi đáng kể
kết quả sử dụng. Các tham số chuyển đổi, mô hình geoid, múi chiếu, kinh
tuyến trục, hệ số tỷ lệ và đơn vị tọa độ phải được khai báo chính xác.
Nếu sử dụng sai hệ quy chiếu, kết quả có thể lệch hàng mét hoặc hàng
chục mét, dù thiết bị GNSS đã đo rất chính xác trong hệ ban đầu.

Kết quả đo GNSS thường được xác định trong hệ tọa độ toàn cầu, phổ biến
là WGS-84 hoặc các khung tham chiếu quốc tế có liên quan. Tuy nhiên,
trong nhiều ứng dụng tại Việt Nam, kết quả cuối cùng cần được thể hiện
trong hệ tọa độ quốc gia VN-2000 hoặc hệ tọa độ địa phương phục vụ công
trình. Vì vậy, đào tạo GNSS không thể tách rời nội dung hệ quy chiếu,
phép chiếu bản đồ, chuyển đổi tọa độ và đánh giá sai số do chuyển đổi.

**7.3.9. Đào tạo về bài toán chuyển đổi hệ tọa độ và hệ quy chiếu**

# 8. Xử lý chung

## **8.1. Kết quả đào tạo**

Sau khi đào tạo xong, học viên được đánh giá thông qua bài kiểm tra lý
thuyết và thực hành theo quy định tại F 03.05 - Đánh giá kết quả đào
tạo. Bài kiểm tra lý thuyết tập trung vào nguyên lý GNSS, nguồn sai số,
phương pháp đo, điều kiện môi trường, xử lý số liệu và tính toán độ
không đảm bảo đo. Bài kiểm tra thực hành đánh giá năng lực thiết lập
thiết bị, thực hiện phép đo, xử lý dữ liệu và lập báo cáo kết quả.

Kết quả đào tạo được phân loại đạt hoặc không đạt theo quy định F 03.06.
Học viên đạt yêu cầu được cấp chứng chỉ đào tạo và được xem xét phân
công công việc phù hợp với năng lực đã được đánh giá. Đối với học viên
chưa đạt, đơn vị đào tạo phải xác định nội dung chưa đáp ứng và tổ chức
đào tạo bổ sung trước khi giao nhiệm vụ liên quan đến vận hành, kiểm
định hoặc hiệu chuẩn phương tiện đo GNSS.

## **8.2. Chu kỳ đào tạo**

Khuyến nghị đào tạo lại định kỳ 12 tháng một lần hoặc khi có thay đổi
lớn về quy trình kỹ thuật, thiết bị, phần mềm xử lý, yêu cầu pháp lý,
yêu cầu công nhận hoặc phương pháp đánh giá độ không đảm bảo đo. Việc
đào tạo lại cũng cần được thực hiện khi nhân sự không tham gia hoạt động
chuyên môn trong thời gian dài hoặc khi kết quả giám sát năng lực cho
thấy cần củng cố kỹ năng.

# 9. Phụ lục

Phụ lục 01 - Biên bản đào tạo (GT).

*\*

# TÀI LIỆU THAM KHẢO

1.  ISO 17123-8: Optics and optical instruments - Field procedures for
    testing geodetic and surveying instruments - Part 8: GNSS field
    measurement systems in real-time kinematic (RTK).

2.  ĐLVN:2023, Phương tiện đo định vị bằng vệ tinh (GNSS) - Quy trình
    kiểm định, Ban kỹ thuật đo lường TC 7 biên soạn.

3.  Hans Heister, The new ISO standard 17123-8 for checking GNSS field
    measurement systems, FIG Working Week 2008, Stockholm, Sweden.

4.  Evangelia Lambrou and Nikolaos Kanellopoulos, A convenient procedure
    for the calibration and check of GNSS systems by using the relative
    static positioning method, International Journal of Scientific &
    Engineering Research, Vol. 9, Issue 3, 2018.

5.  Kun Shi, Yunfeng Qiu, Biyun Zhao, Jin Nie and Yuhan Chen,
    Calibration of GPS receivers based on IGS and CORS techniques,
    Geo-spatial Information Science, 15:3, 213-217, 2012.

6.  Nadya Goldovsky, GPS Receiver Calibration: Why Is It Necessary?,
    Time and Frequency Metrology, 2007.

7.  Andriy Dyukov, Designing a Test Asset and Validating the Accuracy of
    GPS/GNSS Speed Measurement, Master thesis, RMIT University, 2017.

8.  U.S. Environmental Protection Agency, Global Positioning System,
    Operating Procedure FSBPROC-110-R5, Effective Date: December 16,
    2024.

**\**

# PHỤ LỤC I -- BỘ CÂU HỎI ĐÁNH GIÁ ĐÀO TẠO GPS/GNSS

Bộ câu hỏi dưới đây được sử dụng để đánh giá mức độ hiểu biết của học
viên sau quá trình đào tạo về kỹ thuật định vị vệ tinh GPS/GNSS. Nội
dung câu hỏi được xây dựng trên cơ sở giáo trình đào tạo ETV.MEE 01,
tiêu chuẩn ISO 17123-8, ĐLVN GNSS 2023 và các tài liệu kỹ thuật quốc tế
liên quan đến đo lường, kiểm định và hiệu chuẩn hệ thống GNSS.

## 1. Câu hỏi đúng / sai

1\. GNSS là thuật ngữ chung cho các hệ thống định vị vệ tinh toàn cầu
như GPS, GLONASS, GALILEO và BEIDOU. Đúng / Sai

2\. Phương pháp RTK có thể đạt độ chính xác ở mức centimet trong điều
kiện đo phù hợp. Đúng / Sai

3\. HDOP càng lớn thì chất lượng hình học vệ tinh càng tốt. Đúng / Sai

4\. Hiện tượng nhiễu đa đường có thể gây sai lệch kết quả đo GNSS. Đúng
/ Sai

5\. Đo tĩnh (Static) thường có độ chính xác cao hơn đo RTK. Đúng / Sai

6\. Mạng CORS được sử dụng để truyền dữ liệu cải chính cho hệ thống RTK.
Đúng / Sai

7\. Sai số tầng điện ly không ảnh hưởng đến tín hiệu GNSS. Đúng / Sai

8\. Bản tin NMEA có thể cung cấp thông tin về trạng thái FIX và số lượng
vệ tinh. Đúng / Sai

9\. Độ không đảm bảo đo là đại lượng đặc trưng cho độ tin cậy của kết
quả đo. Đúng / Sai

10\. Máy thu GNSS đa tần có khả năng giảm ảnh hưởng của sai số khí quyển
tốt hơn máy đơn tần. Đúng / Sai

## 2. Câu hỏi lựa chọn phương án

1\. Nguyên lý cơ bản của hệ thống GNSS là gì?

> A. Đo áp suất khí quyển
>
> B. Giao hội nghịch không gian
>
> C. Đo từ trường Trái đất
>
> D. Đo nhiệt độ môi trường

2\. Thiết bị nào dùng để phát dữ liệu cải chính trong hệ RTK?

> A. Rover
>
> B. Data Logger
>
> C. Base
>
> D. Anten

3\. Yếu tố nào ảnh hưởng mạnh đến chất lượng hình học vệ tinh?

> A. HDOP
>
> B. Nhiệt độ
>
> C. Độ ẩm
>
> D. Áp suất

4\. Phương pháp đo nào thường cho độ chính xác cao nhất?

> A. Single Point
>
> B. DGPS
>
> C. RTK
>
> D. Static

5\. Dữ liệu RINEX dùng để làm gì?

> A. Hiển thị bản đồ
>
> B. Lưu dữ liệu GNSS thô
>
> C. Kết nối Internet
>
> D. Hiệu chỉnh nhiệt độ

6\. Hiện tượng Multipath là gì?

> A. Sai số do tín hiệu phản xạ
>
> B. Sai số đồng hồ
>
> C. Sai số khí quyển
>
> D. Sai số nguồn điện

7\. Tiêu chuẩn ISO 17123-8 liên quan đến nội dung nào?

> A. An toàn điện
>
> B. Đánh giá hệ GNSS RTK
>
> C. Hiệu chuẩn nhiệt độ
>
> D. Đo áp suất

8\. Tầng khí quyển nào ảnh hưởng mạnh đến tín hiệu GNSS?

> A. Tầng điện ly
>
> B. Tầng ozone
>
> C. Tầng đối lưu
>
> D. Cả A và C

9\. Trạng thái FIX trong RTK thể hiện điều gì?

> A. Thiết bị mất tín hiệu
>
> B. Đã giải được đa trị nguyên
>
> C. Pin yếu
>
> D. Mất kết nối mạng

10\. Mục đích chính của kiểm định GNSS là gì?

> A. Tăng tốc độ Internet
>
> B. Đảm bảo độ chính xác đo lường
>
> C. Tăng dung lượng pin
>
> D. Lưu dữ liệu

## 3. Đáp án tham khảo

Phần đúng/sai: 1-Đ; 2-Đ; 3-S; 4-Đ; 5-Đ; 6-Đ; 7-S; 8-Đ; 9-Đ; 10-Đ.

Phần trắc nghiệm lựa chọn: 1.B; 2.C; 3.A; 4.D; 5.B; 6.A; 7.B; 8.D; 9.B;
10.B.

**PHỤ LỤC II -- BỘ CÂU HỎI ĐÁNH GIÁ ĐÀO TẠO CHO QUY TRÌNH ETV.MCS-07**

+-----------------------------------------------------------------------+
| **Câu hỏi và đáp án**                                                 |
+=======================================================================+
| **Quy trình ETV.MCS 07 áp dụng để hiệu chuẩn loại phương tiện đo      |
| nào?**                                                                |
|                                                                       |
| A. Máy đo khoảng cách bằng siêu âm                                    |
|                                                                       |
| B. Phương tiện đo định vị bằng vệ tinh (GPS/GNSS)                     |
|                                                                       |
| C. Thiết bị đo từ trường                                              |
|                                                                       |
| D. Máy đo tốc độ bằng radar                                           |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Theo quy trình, địa điểm thực hiện hiệu chuẩn GPS có thể là ở       |
| đâu?**                                                                |
|                                                                       |
| A. Chỉ tại phòng thí nghiệm có kiểm soát môi trường                   |
|                                                                       |
| B. Chỉ ngoài hiện trường có tầm nhìn vệ tinh tốt                      |
|                                                                       |
| C. Tại phòng thí nghiệm hoặc ngoài hiện trường                        |
|                                                                       |
| D. Chỉ tại trạm CORS quốc gia                                         |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Theo định nghĩa trong quy trình, \"Hiệu chuẩn\" là hoạt động gì?**  |
|                                                                       |
| A. Sửa chữa và điều chỉnh thiết bị để đạt sai số nhỏ nhất             |
|                                                                       |
| B. Xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn với giá  |
| trị đo của đại lượng cần đo                                           |
|                                                                       |
| C. Cấp giấy chứng nhận phù hợp quy chuẩn kỹ thuật                     |
|                                                                       |
| D. Kiểm tra thiết bị có hoạt động bình thường hay không               |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Theo quy trình, \"Hiệu chỉnh\" được định nghĩa là gì?**             |
|                                                                       |
| A. Xác định sai số hệ thống và ghi vào giấy chứng nhận                |
|                                                                       |
| B. Tập hợp các thao tác để cho ra số chỉ đã quy định tương ứng với    |
| giá trị đã cho của đại lượng đo                                       |
|                                                                       |
| C. So sánh kết quả đo của thiết bị với chuẩn tham chiếu               |
|                                                                       |
| D. Kiểm tra tình trạng cơ khí bên ngoài của thiết bị                  |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Đơn vị đo tọa độ phẳng E, N trong quy trình ETV.MCS 07 là gì?**     |
|                                                                       |
| A. Km (kilomét)                                                       |
|                                                                       |
| B. Độ (°), phút (\'), giây (\")                                       |
|                                                                       |
| C. Mét (m)                                                            |
|                                                                       |
| D. Feet (ft)                                                          |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Theo Bảng 1 quy trình, các phép kiểm tra bắt buộc khi hiệu chuẩn    |
| GPS gồm những phép nào?**                                             |
|                                                                       |
| A. Kiểm tra bên ngoài và kiểm tra đo lường                            |
|                                                                       |
| B. Kiểm tra kỹ thuật, đánh giá độ lặp lại và ĐKĐB                     |
|                                                                       |
| C. Kiểm tra bên ngoài, kiểm tra kỹ thuật, hiệu chuẩn tọa độ ngang và  |
| đánh giá ĐKĐB                                                         |
|                                                                       |
| D. Kiểm tra bên ngoài, kiểm tra kỹ thuật, hiệu chuẩn tọa độ ngang,    |
| hiệu chuẩn độ cao và đánh giá ĐKĐB                                    |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Theo Bảng 1, phép hiệu chuẩn nào trong quy trình chỉ thực hiện      |
| \"khi áp dụng\" chứ không bắt buộc?**                                 |
|                                                                       |
| A. Kiểm tra bên ngoài (KTBN)                                          |
|                                                                       |
| B. Hiệu chuẩn tọa độ ngang (H)                                        |
|                                                                       |
| C. Hiệu chuẩn độ cao (V)                                              |
|                                                                       |
| D. Đánh giá độ lặp lại và ĐKĐB (U)                                    |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Chuẩn đo lường chính dùng để hiệu chuẩn GPS theo quy trình là gì?** |
|                                                                       |
| A. Máy đo khoảng cách laser                                           |
|                                                                       |
| B. Bộ thu GNSS đa tần cấp trắc địa, anten, bộ điều khiển/phần mềm     |
|                                                                       |
| C. Máy quang phổ tần số cao                                           |
|                                                                       |
| D. Đồng hồ nguyên tử caesium                                          |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Theo quy trình, độ chính xác tọa độ ngang của bộ thu GNSS chuẩn     |
| phải đạt yêu cầu nào?**                                               |
|                                                                       |
| A. Ngang ≤ 5 mm + 1,0 ppm                                             |
|                                                                       |
| B. Ngang ≤ 3 mm + 0,5 ppm hoặc tốt hơn                                |
|                                                                       |
| C. Ngang ≤ 10 mm + 2,0 ppm                                            |
|                                                                       |
| D. Ngang ≤ 1 mm + 0,1 ppm                                             |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Theo quy trình, độ không đảm bảo đo U(k=2) của chuẩn đo lường phải  |
| thỏa mãn điều kiện gì so với MPE của phương tiện đo cần hiệu chuẩn?** |
|                                                                       |
| A. U chuẩn ≤ MPE của PTĐ                                              |
|                                                                       |
| B. U chuẩn ≤ 1/2 MPE của PTĐ                                          |
|                                                                       |
| C. U chuẩn ≤ 1/3 MPE của PTĐ                                          |
|                                                                       |
| D. U chuẩn ≤ 1/5 MPE của PTĐ                                          |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Điều kiện nhiệt độ môi trường khi hiệu chuẩn GPS cầm tay và GNSS    |
| RTK theo quy trình là bao nhiêu?**                                    |
|                                                                       |
| A. (10-40) °C                                                         |
|                                                                       |
| B. (15-35) °C hoặc theo khuyến cáo nhà sản xuất                       |
|                                                                       |
| C. (20-30) °C kiểm soát chặt chẽ                                      |
|                                                                       |
| D. (0-50) °C theo điều kiện hiện trường                               |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Điều kiện độ ẩm môi trường tối đa khi hiệu chuẩn GPS theo quy trình |
| là bao nhiêu?**                                                       |
|                                                                       |
| A. ≤ 70 %RH                                                           |
|                                                                       |
| B. ≤ 75 %RH                                                           |
|                                                                       |
| C. ≤ 80 %RH                                                           |
|                                                                       |
| D. ≤ 85 %RH, không ngưng tụ                                           |
|                                                                       |
| **Đáp án đúng: D**                                                    |
+-----------------------------------------------------------------------+
| **Khi lựa chọn điểm chuẩn ngoài hiện trường, yêu cầu tối thiểu số     |
| điểm chuẩn theo quy trình là bao nhiêu?**                             |
|                                                                       |
| A. Ít nhất 01 điểm                                                    |
|                                                                       |
| B. Ít nhất 02 điểm                                                    |
|                                                                       |
| C. Ít nhất 03 điểm                                                    |
|                                                                       |
| D. Ít nhất 05 điểm                                                    |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Theo quy trình, điểm chuẩn tọa độ sử dụng cho hiệu chuẩn phải đáp   |
| ứng yêu cầu gì về môi trường?**                                       |
|                                                                       |
| A. Có mái che để tránh mưa và nhiệt độ cao                            |
|                                                                       |
| B. Ổn định, thông thoáng vệ tinh, hạn chế phản xạ đa đường            |
|                                                                       |
| C. Nằm trong tòa nhà có kiểm soát nhiệt độ                            |
|                                                                       |
| D. Gần trạm CORS trong vòng 10 km                                     |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Trước khi tiến hành hiệu chuẩn, kiểm định viên cần kiểm tra hiệu    |
| lực của tài liệu nào?**                                               |
|                                                                       |
| A. Chỉ kiểm tra giấy chứng nhận hiệu chuẩn của bộ thu GNSS chuẩn      |
|                                                                       |
| B. Giấy chứng nhận hiệu chuẩn/kiểm định của chuẩn đo lường, thiết bị  |
| phụ và hồ sơ điểm chuẩn tọa độ                                        |
|                                                                       |
| C. Chỉ kiểm tra hồ sơ điểm chuẩn tọa độ                               |
|                                                                       |
| D. Hướng dẫn sử dụng của nhà sản xuất PTĐ                             |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Kiểm tra bên ngoài (KTBN) theo mục 7.1 của quy trình được thực hiện |
| bằng phương pháp nào?**                                               |
|                                                                       |
| A. Đo điện trở cách điện                                              |
|                                                                       |
| B. Kiểm tra bằng mắt để xác định sự phù hợp về hình dáng, kích thước, |
| ký nhãn hiệu, nguồn nuôi, hiển thị, tài liệu và phụ kiện              |
|                                                                       |
| C. Chạy thử phần mềm tự kiểm tra của thiết bị                         |
|                                                                       |
| D. Kiểm tra tần số thu vệ tinh bằng máy phân tích phổ                 |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Kiểm tra kỹ thuật (KTKT) theo mục 7.2 nhằm xác định điều gì?**      |
|                                                                       |
| A. Sai số tọa độ so với chuẩn                                         |
|                                                                       |
| B. Trạng thái hoạt động bình thường của PTĐ theo hướng dẫn sử dụng    |
| của nhà sản xuất                                                      |
|                                                                       |
| C. Độ không đảm bảo đo của PTĐ                                        |
|                                                                       |
| D. Tuổi thọ còn lại của pin                                           |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Nguyên tắc thực hiện phép hiệu chuẩn đo lường GPS theo mục 7.3.1 là |
| gì?**                                                                 |
|                                                                       |
| A. So sánh tần số tín hiệu của PTĐ với đồng hồ nguyên tử              |
|                                                                       |
| B. So sánh trực tiếp kết quả tọa độ của PTĐ với giá trị tọa độ chuẩn  |
| tại các điểm chuẩn                                                    |
|                                                                       |
| C. Đo khoảng cách giữa các điểm bằng máy laser và so sánh             |
|                                                                       |
| D. Tính toán sai số từ dữ liệu thô RINEX tải về từ CORS               |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Đối với GNSS RTK, trạng thái nghiệm nào được khuyến nghị khi ghi    |
| nhận kết quả đo?**                                                    |
|                                                                       |
| A. FLOAT (phân giải nguyên hơi)                                       |
|                                                                       |
| B. SBAS (tăng cường tín hiệu vệ tinh)                                 |
|                                                                       |
| C. FIX (phân giải nguyên cố định)                                     |
|                                                                       |
| D. DGPS (vi phân GPS)                                                 |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Số lần đo lặp tối thiểu tại mỗi điểm chuẩn đối với GNSS RTK theo    |
| quy trình là bao nhiêu?**                                             |
|                                                                       |
| A. 03 lần đo độc lập                                                  |
|                                                                       |
| B. 05 lần đo độc lập                                                  |
|                                                                       |
| C. 10 lần đo độc lập                                                  |
|                                                                       |
| D. 20 lần đo độc lập                                                  |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Đối với GPS cầm tay, số lần đo tối thiểu tại mỗi điểm chuẩn theo    |
| quy trình là bao nhiêu?**                                             |
|                                                                       |
| A. Tối thiểu 03 giá trị đọc                                           |
|                                                                       |
| B. Tối thiểu 05 giá trị đọc                                           |
|                                                                       |
| C. Tối thiểu 10 giá trị đọc hoặc giá trị trung bình trong thời gian   |
| ổn định                                                               |
|                                                                       |
| D. Tối thiểu 20 giá trị đọc                                           |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Theo trình tự đo mục 7.3.2, thông tin nào cần ghi kèm khi ghi nhận  |
| giá trị tọa độ của PTĐ?**                                             |
|                                                                       |
| A. Chỉ ghi tọa độ E, N, h                                             |
|                                                                       |
| B. Tọa độ E, N, h kèm thời gian đo, số vệ tinh, PDOP/HDOP/VDOP, trạng |
| thái nghiệm, điều kiện hiện trường                                    |
|                                                                       |
| C. Tọa độ và giấy chứng nhận hiệu chuẩn thiết bị                      |
|                                                                       |
| D. Tọa độ và số vệ tinh quan sát                                      |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Giữa các lần đo độc lập theo mục 7.3.2d, kiểm định viên phải làm gì |
| để đánh giá độ lặp lại thực tế?**                                     |
|                                                                       |
| A. Đổi sang điểm chuẩn khác và quay lại                               |
|                                                                       |
| B. Tắt nguồn và bật lại thiết bị                                      |
|                                                                       |
| C. Tháo/lắp lại, khởi tạo lại hoặc dịch chuyển/đặt lại thiết bị khi   |
| cần                                                                   |
|                                                                       |
| D. Chờ ít nhất 30 phút giữa hai lần đo                                |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Theo mục 7.3.3, sai lệch tọa độ thành phần East (E) tại lần đo thứ  |
| i được tính theo công thức nào?**                                     |
|                                                                       |
| A. ΔEi = E0 - Ei                                                      |
|                                                                       |
| B. ΔEi = Ei + E0                                                      |
|                                                                       |
| C. ΔEi = Ei - E0                                                      |
|                                                                       |
| D. ΔEi = (Ei x E0) / 2                                                |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Sai số tọa độ ngang tại lần đo thứ i (ΔHi) được tính theo công thức |
| nào?**                                                                |
|                                                                       |
| A. ΔHi = ΔEi + ΔNi                                                    |
|                                                                       |
| B. ΔHi = căn bậc hai của (ΔEi bình phương + ΔNi bình phương)          |
|                                                                       |
| C. ΔHi = (ΔEi + ΔNi) / 2                                              |
|                                                                       |
| D. ΔHi = ΔEi nhân ΔNi                                                 |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Một thiết bị GNSS RTK đo tại điểm chuẩn cho kết quả: E = 583        |
| 251,345 m; giá trị chuẩn E0 = 583 251,312 m. Sai lệch tọa độ East ΔE  |
| là bao nhiêu?**                                                       |
|                                                                       |
| A. +0,033 m                                                           |
|                                                                       |
| B. -0,033 m                                                           |
|                                                                       |
| C. +0,312 m                                                           |
|                                                                       |
| D. +0,657 m                                                           |
|                                                                       |
| **Đáp án đúng: A**                                                    |
+-----------------------------------------------------------------------+
| **Một GPS RTK tại điểm chuẩn cho: ΔEi = +0,025 m và ΔNi = +0,020 m.   |
| Sai số tọa độ ngang ΔHi bằng bao nhiêu?**                             |
|                                                                       |
| A. 0,032 m                                                            |
|                                                                       |
| B. 0,022 m                                                            |
|                                                                       |
| C. 0,045 m                                                            |
|                                                                       |
| D. 0,005 m                                                            |
|                                                                       |
| **Đáp án đúng: A**                                                    |
+-----------------------------------------------------------------------+
| **Thành phần độ không đảm bảo đo u_rep do độ lặp lại được tính theo   |
| công thức nào?**                                                      |
|                                                                       |
| A. urep = s × căn bậc hai(n)                                          |
|                                                                       |
| B. urep = s / n                                                       |
|                                                                       |
| C. urep = s / căn bậc hai(n)                                          |
|                                                                       |
| D. urep = s bình phương / n                                           |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Thành phần độ không đảm bảo đo u_res do độ phân giải của thiết bị   |
| được tính theo công thức nào?**                                       |
|                                                                       |
| A. ures = d / 2                                                       |
|                                                                       |
| B. ures = d / 6                                                       |
|                                                                       |
| C. ures = d / căn bậc hai(12)                                         |
|                                                                       |
| D. ures = d × căn bậc hai(3)                                          |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Thành phần u_ref lấy từ giấy chứng nhận hiệu chuẩn công bố độ không |
| đảm bảo mở rộng Uref với hệ số phủ k. Công thức tính u_ref là gì?**   |
|                                                                       |
| A. uref = Uref × k                                                    |
|                                                                       |
| B. uref = Uref / k                                                    |
|                                                                       |
| C. uref = Uref × căn bậc hai(k)                                       |
|                                                                       |
| D. uref = k / Uref                                                    |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Công thức tính độ không đảm bảo đo chuẩn tổng hợp uc theo quy trình |
| là gì?**                                                              |
|                                                                       |
| A. uc = uref + urep + ures + ucent + uenv + umethod                   |
|                                                                       |
| B. uc = căn bậc hai(uref² + urep² + ures² + ucent² + uenv² +          |
| umethod²)                                                             |
|                                                                       |
| C. uc = (uref² + urep² + ures²) / 3                                   |
|                                                                       |
| D. uc = uref × urep × ures                                            |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Theo quy trình, hệ số phủ k thông thường được chọn là bao nhiêu và  |
| tương ứng với mức tin cậy nào?**                                      |
|                                                                       |
| A. k = 1, mức tin cậy 68 %                                            |
|                                                                       |
| B. k = 2, mức tin cậy xấp xỉ 95 %                                     |
|                                                                       |
| C. k = 3, mức tin cậy 99,7 %                                          |
|                                                                       |
| D. k = 1,96, mức tin cậy chính xác 95 %                               |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Độ không đảm bảo đo mở rộng U được tính theo công thức nào?**       |
|                                                                       |
| A. U = uc / k                                                         |
|                                                                       |
| B. U = uc + k                                                         |
|                                                                       |
| C. U = k × uc                                                         |
|                                                                       |
| D. U = k² × uc                                                        |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Khi cần công bố độ không đảm bảo đo tổng hợp theo phương ngang UH,  |
| công thức đúng là gì?**                                               |
|                                                                       |
| A. UH = k × (uc,E + uc,N)                                             |
|                                                                       |
| B. UH = k × căn bậc hai(uc,E² + uc,N²)                                |
|                                                                       |
| C. UH = (UE + UN) / 2                                                 |
|                                                                       |
| D. UH = k × uc,E × uc,N                                               |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Một GNSS RTK đo 5 lần độc lập tại điểm chuẩn cho sai số ngang:      |
| 0,021; 0,018; 0,025; 0,019; 0,022 m. Tính giá trị trung bình sai số   |
| ngang?**                                                              |
|                                                                       |
| A. 0,019 m                                                            |
|                                                                       |
| B. 0,021 m                                                            |
|                                                                       |
| C. 0,022 m                                                            |
|                                                                       |
| D. 0,025 m                                                            |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Chứng chỉ chuẩn điểm tọa độ công bố Uref = 0,012 m với k = 2. Thành |
| phần u_ref để đưa vào tính uc là bao nhiêu?**                         |
|                                                                       |
| A. 0,024 m                                                            |
|                                                                       |
| B. 0,012 m                                                            |
|                                                                       |
| C. 0,006 m                                                            |
|                                                                       |
| D. 0,004 m                                                            |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Thiết bị GPS cầm tay có độ phân giải hiển thị tọa độ phẳng d =      |
| 0,001 m. Thành phần u_res là bao nhiêu?**                             |
|                                                                       |
| A. 0,0005 m                                                           |
|                                                                       |
| B. 0,0003 m                                                           |
|                                                                       |
| C. 0,0002 m                                                           |
|                                                                       |
| D. 0,0001 m                                                           |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Tính uc từ các thành phần: uref = 0,006 m; urep = 0,008 m; ures =   |
| 0,0003 m; ucent = 0,003 m; uenv = 0,002 m; umethod = 0,001 m. Kết quả |
| uc gần đúng là bao nhiêu?**                                           |
|                                                                       |
| A. 0,020 m                                                            |
|                                                                       |
| B. 0,011 m                                                            |
|                                                                       |
| C. 0,010 m                                                            |
|                                                                       |
| D. 0,015 m                                                            |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Nếu uc = 0,011 m và k = 2, độ không đảm bảo đo mở rộng U bằng bao   |
| nhiêu?**                                                              |
|                                                                       |
| A. 0,011 m                                                            |
|                                                                       |
| B. 0,016 m                                                            |
|                                                                       |
| C. 0,022 m                                                            |
|                                                                       |
| D. 0,044 m                                                            |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Khi sử dụng tọa độ địa lý thay vì tọa độ phẳng, quy trình yêu cầu   |
| kiểm định viên phải làm gì trước khi tính sai số tọa độ ngang?**      |
|                                                                       |
| A. Tính thẳng sai số theo giây (\") của cung độ                       |
|                                                                       |
| B. Chuyển đổi về hệ tọa độ phẳng hoặc quy đổi chênh lệch góc sang đơn |
| vị mét                                                                |
|                                                                       |
| C. Chỉ so sánh vĩ độ, bỏ qua kinh độ                                  |
|                                                                       |
| D. Nhân chênh lệch với hằng số 111,32 km/°                            |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Kết quả hiệu chuẩn theo mục 7.3.5 bắt buộc phải công bố những thông |
| tin nào?**                                                            |
|                                                                       |
| A. Chỉ cần công bố sai số và ĐKĐB mở rộng                             |
|                                                                       |
| B. Điểm đo, giá trị chuẩn, giá trị trung bình PTĐ, sai số, độ lặp     |
| lại, U(k=2), hệ tọa độ, điều kiện đo và trạng thái nghiệm             |
|                                                                       |
| C. Điểm đo và giấy chứng nhận hiệu chuẩn                              |
|                                                                       |
| D. Số vệ tinh, PDOP và trạng thái kết nối                             |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Theo mục 7.3.5, khi nào được phép kết luận PTĐ \"phù hợp\" hoặc     |
| \"không phù hợp\"?**                                                  |
|                                                                       |
| A. Khi sai số vượt quá ±1 m                                           |
|                                                                       |
| B. Khi ĐKĐB mở rộng U nhỏ hơn sai số đo                               |
|                                                                       |
| C. Chỉ khi có tiêu chí MPE hoặc yêu cầu kỹ thuật được khách hàng/nhà  |
| sản xuất quy định trước                                               |
|                                                                       |
| D. Luôn luôn phải kết luận trong mọi trường hợp                       |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Theo mục 8.1.1, giấy chứng nhận hiệu chuẩn GPS phải thể hiện rõ     |
| những nội dung gì?**                                                  |
|                                                                       |
| A. Chỉ cần số sê-ri và ngày hiệu chuẩn                                |
|                                                                       |
| B. Phương pháp hiệu chuẩn, chuẩn sử dụng, hệ tọa độ, điều kiện đo,    |
| kết quả đo, sai số và ĐKĐB mở rộng                                    |
|                                                                       |
| C. Tên khách hàng và thời hạn hiệu chuẩn tiếp theo                    |
|                                                                       |
| D. Chỉ cần ĐKĐB mở rộng và kết luận phù hợp/không phù hợp             |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Chu kỳ hiệu chuẩn khuyến nghị cho GPS/GNSS theo quy trình ETV.MCS   |
| 07 là bao nhiêu?**                                                    |
|                                                                       |
| A. 6 tháng                                                            |
|                                                                       |
| B. 12 tháng hoặc theo yêu cầu quản lý chất lượng, điều kiện sử dụng   |
|                                                                       |
| C. 24 tháng                                                           |
|                                                                       |
| D. 36 tháng                                                           |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Theo mục 8.1.2, trường hợp kết quả bị ảnh hưởng bởi điều kiện hiện  |
| trường không đáp ứng yêu cầu, phòng thí nghiệm phải xử lý như thế     |
| nào?**                                                                |
|                                                                       |
| A. Vẫn cấp giấy chứng nhận bình thường                                |
|                                                                       |
| B. Ghi chú giới hạn áp dụng của kết quả hoặc không thực hiện phép     |
| hiệu chuẩn                                                            |
|                                                                       |
| C. Tự động từ chối và trả lại thiết bị                                |
|                                                                       |
| D. Đo lại ở điểm khác không cần ghi chú                               |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Tình huống: Kiểm định viên đến đo tại điểm chuẩn nhưng xung quanh   |
| có tòa nhà cao tầng gần, thiết bị chỉ thu 4 vệ tinh và PDOP = 6,5.    |
| Cách xử lý đúng theo quy trình là gì?**                               |
|                                                                       |
| A. Vẫn tiến hành đo bình thường vì có đủ tín hiệu                     |
|                                                                       |
| B. Ghi nhận điều kiện bất thường và tìm điểm chuẩn khác thông thoáng  |
| hơn hoặc ghi chú ảnh hưởng đến kết quả                                |
|                                                                       |
| C. Tăng số lần đo lên 20 lần để bù                                    |
|                                                                       |
| D. Dùng chế độ SBAS thay vì RTK                                       |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Tình huống: Kiểm định viên A nhận GPS RTK để hiệu chuẩn nhưng giấy  |
| chứng nhận hiệu chuẩn của bộ thu GNSS chuẩn đã hết hạn 2 tuần. Anh ta |
| vẫn tiến hành vì thiết bị hoạt động tốt. Nhận định nào đúng?**        |
|                                                                       |
| A. Đúng, vì thiết bị vẫn hoạt động bình thường                        |
|                                                                       |
| B. Sai, vì chứng chỉ hiệu chuẩn chuẩn đã hết hiệu lực nên liên kết    |
| chuẩn không được đảm bảo                                              |
|                                                                       |
| C. Đúng nếu sai số đo vẫn nằm trong MPE                               |
|                                                                       |
| D. Có thể chấp nhận nếu ghi chú vào biên bản                          |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Tình huống: Khi đo, kiểm định viên thấy một lần đo cho sai số ngang |
| 2,5 m trong khi 4 lần còn lại đều dưới 0,05 m. Theo quy trình, phải   |
| xử lý như thế nào?**                                                  |
|                                                                       |
| A. Lấy trung bình tất cả 5 giá trị                                    |
|                                                                       |
| B. Ghi nhận kết quả bất thường, xác định nguyên nhân, loại bỏ có căn  |
| cứ và đo lại                                                          |
|                                                                       |
| C. Chỉ loại bỏ và không cần ghi chú                                   |
|                                                                       |
| D. Giảm số lần đo xuống 4 lần và tính lại                             |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
| **Tình huống: Khách hàng yêu cầu hiệu chuẩn GPS RTK nhưng không cung  |
| cấp MPE hoặc tiêu chí kỹ thuật. Phòng thí nghiệm xử lý kết luận phù   |
| hợp/không phù hợp như thế nào?**                                      |
|                                                                       |
| A. Tự đặt tiêu chí dựa trên kinh nghiệm                               |
|                                                                       |
| B. Kết luận dựa trên ĐKĐB mở rộng U                                   |
|                                                                       |
| C. Không kết luận phù hợp/không phù hợp; chỉ công bố sai số và ĐKĐB   |
| đo được                                                               |
|                                                                       |
| D. Từ chối hiệu chuẩn vì thiếu thông tin                              |
|                                                                       |
| **Đáp án đúng: C**                                                    |
+-----------------------------------------------------------------------+
| **Tình huống: Kiểm định viên đo GNSS RTK tại điểm chuẩn và thiết bị   |
| hiển thị trạng thái FLOAT suốt quá trình đo, không đạt FIX. Theo quy  |
| trình, cách xử lý đúng là gì?**                                       |
|                                                                       |
| A. Vẫn ghi nhận kết quả FLOAT vì đủ số lần đo                         |
|                                                                       |
| B. Ghi nhận trạng thái nghiệm trong biên bản, đánh giá ảnh hưởng đến  |
| ĐKĐB và xem xét có tiếp tục hay không                                 |
|                                                                       |
| C. Tăng thêm số lần đo lên 20 lần để bù trừ                           |
|                                                                       |
| D. Chuyển sang đo GPS cầm tay thay thế                                |
|                                                                       |
| **Đáp án đúng: B**                                                    |
+-----------------------------------------------------------------------+
