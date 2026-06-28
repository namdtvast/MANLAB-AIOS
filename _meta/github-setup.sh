#!/bin/sh
# Cài đặt 1 lần để đưa repo lên GitHub (private) và bật tự động đẩy.
set -e
cd "$(dirname "$0")/.."

# 1) Đăng nhập GitHub (mở trình duyệt) — chỉ cần làm 1 lần trên máy
gh auth login

# 2) Tạo repo PRIVATE trên GitHub, gắn remote 'origin' và đẩy toàn bộ lên
gh repo create MANLAB-AIOS --private --source=. --remote=origin --push

echo "Hoàn tất. Từ nay mỗi 'git commit' sẽ tự động đẩy lên nhờ hook post-commit."
