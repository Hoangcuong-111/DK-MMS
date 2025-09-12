Thông tin Dự án
Ngôn ngữ: Tiếng Việt
Công nghệ: React + TypeScript + Tailwind CSS
Tên dự án: dk_cmms_modules
Yêu cầu gốc: Xây dựng giao diện cho các module CMMS bao gồm quản lý thiết bị, bảo trì, sự cố, tồn kho, lịch bảo trì và phân quyền người dùng
1. Định nghĩa Sản phẩm
1.1 Mục tiêu Sản phẩm
Tối ưu hóa quy trình bảo trì: Cung cấp hệ thống quản lý bảo trì toàn diện, giảm thời gian chết máy
Quản lý tài sản hiệu quả: Theo dõi và quản lý thông tin thiết bị một cách có hệ thống
Nâng cao hiệu suất vận hành: Cung cấp công cụ phân tích và báo cáo để tối ưu hóa hoạt động
1.2 User Stories
Quản lý thiết bị:

Là một kỹ sư bảo trì, tôi muốn xem thông tin chi tiết thiết bị để lập kế hoạch bảo trì phù hợp
Là một quản lý, tôi muốn theo dõi tình trạng tất cả thiết bị để đưa ra quyết định đầu tư
Quản lý bảo trì:

Là một kỹ thuật viên, tôi muốn nhận lệnh bảo trì và cập nhật tiến độ để quản lý công việc hiệu quả
Là một supervisor, tôi muốn lập kế hoạch bảo trì để đảm bảo thiết bị hoạt động ổn định
Quản lý sự cố:

Là một operator, tôi muốn báo cáo sự cố nhanh chóng để giảm thiểu thời gian chết máy
Là một kỹ sư, tôi muốn phân tích nguyên nhân sự cố để ngăn ngừa tái diễn
Quản lý tồn kho:

Là một thủ kho, tôi muốn theo dõi tồn kho phụ tùng để đảm bảo không thiếu hụt
Là một planner, tôi muốn liên kết phụ tùng với thiết bị để lập kế hoạch mua sắm
1.3 Phân tích Đối thủ Cạnh tranh
Sản phẩm	Ưu điểm	Nhược điểm
SAP PM	Tích hợp ERP mạnh, báo cáo chi tiết	Phức tạp, chi phí cao, khó triển khai
Maximo	Chức năng đầy đủ, khả năng tùy chỉnh cao	Giao diện cũ, yêu cầu đào tạo nhiều
UpKeep	Giao diện thân thiện, mobile app tốt	Tính năng hạn chế, không phù hợp nhà máy lớn
Fiix	Dễ sử dụng, giá cả hợp lý	Tích hợp hạn chế, báo cáo cơ bản
Maintenance Connection	Chuyên biệt cho bảo trì, workflow tốt	Giao diện lỗi thời, hỗ trợ kém
FTMaintenance	Giá rẻ, triển khai nhanh	Tính năng cơ bản, không scale được
DK CMMS	Giao diện hiện đại, tùy chỉnh cao	Sản phẩm mới, cần xây dựng thương hiệu
1.4 Biểu đồ Định vị Cạnh tranh
Giải pháp cao cấp
Quá phức tạp
Cơ bản
Tối ưu
DK CMMS
FTMaintenance
Maintenance Connection
Fiix
UpKeep
Maximo
SAP PM
Độ phức tạp thấp
Độ phức tạp cao
Chi phí thấp
Chi phí cao
“Phân tích Cạnh tranh CMMS”

2. Đặc tả Kỹ thuật
2.1 Phân tích Yêu cầu
Hệ thống CMMS cần đáp ứng các yêu cầu chính:

Quản lý master data: Thiết bị, phụ tùng, nhân sự
Workflow bảo trì: Từ lập kế hoạch đến thực hiện và báo cáo
Quản lý sự cố: Báo cáo, phân tích và xử lý
Tích hợp: Với hệ thống ERP, IoT sensors
Báo cáo: Dashboard, KPI, phân tích xu hướng
2.2 Requirements Pool
P0 (Must-have)
Quản lý danh mục thiết bị với đầy đủ thông tin kỹ thuật
Tạo và theo dõi work orders bảo trì
Báo cáo sự cố và phân công xử lý
Quản lý tồn kho phụ tùng cơ bản
Hệ thống phân quyền người dùng
Giao diện responsive và dark mode
P1 (Should-have)
Lịch bảo trì tự động và cảnh báo
Tích hợp với hệ thống ERP
Báo cáo và dashboard nâng cao
Mobile app cho technician
Quản lý tài liệu kỹ thuật
Workflow approval
P2 (Nice-to-have)
Tích hợp IoT sensors
AI predictive maintenance
Barcode/QR code scanning
Offline capability
Advanced analytics
Integration với third-party systems
3. Thiết kế Giao diện Chi tiết
3.1 Module Quản lý Thiết bị
3.1.1 Màn hình Danh sách Thiết bị
Layout:

[Header với breadcrumb: Trang chủ > Quản lý thiết bị]

[Thanh công cụ]
├── Bộ lọc: [Khu vực ▼] [Loại thiết bị ▼] [Trạng thái ▼] [Tìm kiếm...]
├── Actions: [+ Thêm thiết bị] [↓ Xuất Excel] [⚙ Cài đặt cột]

[Bảng danh sách thiết bị]
┌─────────────────────────────────────────────────────────────────┐
│ ☐ │ Mã TB │ Tên thiết bị │ Loại │ Khu vực │ Trạng thái │ Hành động │
├─────────────────────────────────────────────────────────────────┤
│ ☐ │ EQ001 │ Máy nén khí  │ Nén   │ Sản xuất│ 🟢 Hoạt động│ 👁 📝 🗑│
│ ☐ │ EQ002 │ Băng tải A1  │ Vận   │ Đóng gói│ 🟡 Bảo trì  │ 👁 📝 🗑│
└─────────────────────────────────────────────────────────────────┘

[Phân trang: ◀ 1 2 3 ... 10 ▶] [Hiển thị 1-20 của 200 bản ghi]
Tính năng:

Bộ lọc đa tiêu chí với autocomplete
Sắp xếp theo cột
Bulk actions (xóa, cập nhật trạng thái)
Quick view tooltip khi hover
Export Excel/PDF với template tùy chỉnh
3.1.2 Màn hình Chi tiết Thiết bị
Layout:

[Header: Thiết bị EQ001 - Máy nén khí] [📝 Chỉnh sửa] [🗑 Xóa]

[Tab Navigation]
├── 📋 Thông tin chính │ 🔧 Kỹ thuật │ 📄 Tài liệu │ 📊 Lịch sử │ 🔗 Liên kết

[Tab: Thông tin chính]
┌─────────────────────────────────────────────────────────────────┐
│ Thông tin cơ bản                                                │
├─────────────────────────────────────────────────────────────────┤
│ Mã thiết bị: EQ001          │ Tên: Máy nén khí Atlas Copco     │
│ Loại: Máy nén              │ Nhóm: Thiết bị khí nén            │
│ Khu vực: Sản xuất          │ Vị trí: Workshop A - Line 1       │
│ Trạng thái: 🟢 Hoạt động    │ Mức độ quan trọng: ⭐⭐⭐⭐⭐      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Thông tin kỹ thuật                                              │
├─────────────────────────────────────────────────────────────────┤
│ Hãng sản xuất: Atlas Copco │ Model: GA 75 VSD                  │
│ Số serial: AC123456789     │ Năm sản xuất: 2020                │
│ Công suất: 75 kW           │ Áp suất: 8 bar                    │
│ Lưu lượng: 12.5 m³/min     │ Điện áp: 380V                     │
└─────────────────────────────────────────────────────────────────┘
3.1.3 Form Thêm/Sửa Thiết bị
Validation Rules:

Mã thiết bị: Bắt buộc, unique, format EQ + 3 số
Tên thiết bị: Bắt buộc, tối đa 100 ký tự
Khu vực: Bắt buộc, chọn từ danh sách có sẵn
Năm lắp đặt: Không được lớn hơn năm hiện tại
3.2 Module Quản lý Bảo trì
3.2.1 Dashboard Bảo trì
Layout:

[KPI Cards Row]
┌─────────┬─────────┬─────────┬─────────┐
│ 📋 Lệnh │ ⏰ Quá  │ 🔧 Đang │ ✅ Hoàn │
│ chờ: 15 │ hạn: 3  │ thực: 8 │ thành:42│
└─────────┴─────────┴─────────┴─────────┘

[Biểu đồ và Bảng]
┌─────────────────────┬───────────────────────────────────┐
│ 📊 Workload Chart   │ 📋 Lệnh bảo trì ưu tiên cao       │
│                     ├───────────────────────────────────┤
│ [Gantt chart showing│ WO001 │ Bảo trì máy nén │ 2 ngày  │
│  maintenance        │ WO002 │ Thay dầu băng   │ 1 ngày  │
│  schedule by week]  │ WO003 │ Kiểm tra motor  │ 3 ngày  │
└─────────────────────┴───────────────────────────────────┘

[Quick Actions]
[+ Tạo lệnh bảo trì] [📅 Xem lịch] [📊 Báo cáo] [⚙ Cài đặt]
3.2.2 Tạo Lệnh Bảo trì (Work Order)
Workflow:
Định kỳ

Đột xuất

Tạo WO

Loại bảo trì

Chọn từ PM Schedule

Nhập thông tin thủ công

Form chi tiết

Phân công technician

Lập kế hoạch vật tư

Phê duyệt

Phát hành WO


Form Layout:

[Wizard Steps: 1.Thông tin cơ bản → 2.Phân công → 3.Vật tư → 4.Xác nhận]

[Step 1: Thông tin cơ bản]
┌─────────────────────────────────────────────────────────────────┐
│ Loại bảo trì: ○ Định kỳ ● Đột xuất ○ Dự đoán ○ Khắc phục       │
│ Thiết bị: [Tìm kiếm thiết bị...] 🔍                             │
│ Mô tả công việc: [Textarea với rich text editor]                │
│ Mức độ ưu tiên: ○ Thấp ● Trung bình ○ Cao ○ Khẩn cấp          │
│ Thời gian dự kiến: [Từ ngày] - [Đến ngày] ([X] giờ)            │
└─────────────────────────────────────────────────────────────────┘

[Navigation: [◀ Quay lại] [Tiếp theo ▶]]
3.2.3 Thực hiện Bảo trì (Mobile-first)
Mobile Layout:

┌─────────────────────────────────┐
│ WO001 - Bảo trì máy nén khí     │
├─────────────────────────────────┤
│ 🔧 Trạng thái: Đang thực hiện   │
│ ⏱ Bắt đầu: 08:00 - 07/09/2024  │
│ 👤 Kỹ thuật viên: Nguyễn Văn A  │
├─────────────────────────────────┤
│ ✅ Checklist công việc:         │
│ ☑ Tắt nguồn điện               │
│ ☑ Xả áp suất                   │
│ ☐ Thay dầu máy nén             │
│ ☐ Kiểm tra belt                │
│ ☐ Test vận hành               │
├─────────────────────────────────┤
│ 📝 Ghi chú: [Text area]        │
│ 📷 Ảnh: [Camera button]        │
│ 🔧 Phụ tùng: [Scan QR]         │
├─────────────────────────────────┤
│ [⏸ Tạm dừng] [✅ Hoàn thành]   │
└─────────────────────────────────┘
3.3 Module Quản lý Sự cố
3.3.1 Form Báo cáo Sự cố
Layout:

[Header: Báo cáo sự cố mới] [❌ Đóng]

┌─────────────────────────────────────────────────────────────────┐
│ 🚨 Thông tin sự cố                                             │
├─────────────────────────────────────────────────────────────────┤
│ Thiết bị: [Dropdown với search] 🔍                             │
│ Loại sự cố: ○ Điện ○ Cơ khí ○ Tự động hóa ○ Hiệu chuẩn ○ Khác │
│ Mức độ nghiêm trọng: ○ Thấp ○ Trung bình ● Cao ○ Khẩn cấp     │
│ Thời gian xảy ra: [DateTime picker]                            │
├─────────────────────────────────────────────────────────────────┤
│ 📝 Mô tả sự cố:                                                │
│ [Rich text editor với template gợi ý]                          │
│ - Hiện tượng:                                                  │
│ - Tác động:                                                    │
│ - Hành động đã thực hiện:                                      │
├─────────────────────────────────────────────────────────────────┤
│ 📷 Đính kèm: [Drag & drop area]                               │
│ 🎥 Video │ 📄 Tài liệu │ 🖼 Hình ảnh                          │
├─────────────────────────────────────────────────────────────────┤
│ [💾 Lưu nháp] [📤 Gửi báo cáo]                                │
└─────────────────────────────────────────────────────────────────┘
3.3.2 Xử lý Sự cố
Kanban Board:

┌─────────────┬─────────────┬─────────────┬─────────────┐
│ 📥 Mới      │ 🔍 Phân tích │ 🔧 Xử lý    │ ✅ Đóng     │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ INC001      │ INC003      │ INC005      │ INC007      │
│ Máy dừng    │ Rò rỉ dầu   │ Thay motor  │ Bảo trì OK  │
│ 🔴 Cao      │ 🟡 TB       │ 🟠 Cao      │ 🟢 Thấp     │
│ 2h          │ 1 ngày      │ 3 ngày      │ Hoàn thành  │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ INC002      │ INC004      │ INC006      │ INC008      │
│ Báo động    │ Kiểm tra    │ Chờ phụ tùng│ Đã test    │
│ 🟡 TB       │ 🟢 Thấp     │ 🔴 Cao      │ 🟢 Thấp     │
│ 30 phút     │ 2 ngày      │ 5 ngày      │ Hoàn thành  │
└─────────────┴─────────────┴─────────────┴─────────────┘

[+ Thêm sự cố] [🔍 Lọc] [📊 Báo cáo] [⚙ Cài đặt]
3.4 Module Quản lý Tồn kho
3.4.1 Dashboard Tồn kho
Layout:

[KPI Row]
┌─────────┬─────────┬─────────┬─────────┐
│ 📦 Tổng │ ⚠ Cảnh  │ 💰 Giá  │ 🔄 Chu  │
│ SKU:1247│ báo: 23 │ trị:2.1B│ chuyển:8│
└─────────┴─────────┴─────────┴─────────┘

[Charts Row]
┌─────────────────────┬───────────────────────────────────┐
│ 📊 Phân bố tồn kho  │ ⚠ Cảnh báo tồn kho thấp          │
│ [Pie chart showing  ├───────────────────────────────────┤
│  inventory by       │ SKU001 │ Vòng bi 6205  │ 2/50    │
│  category]          │ SKU002 │ Dầu Shell 15W │ 5/100   │
│                     │ SKU003 │ Lọc khí P123  │ 1/20    │
└─────────────────────┴───────────────────────────────────┘

[Quick Actions]
[📦 Nhập kho] [📤 Xuất kho] [🔍 Tìm kiếm] [📊 Báo cáo]
3.4.2 Danh mục Phụ tùng
Advanced Search:

┌─────────────────────────────────────────────────────────────────┐
│ 🔍 Tìm kiếm nâng cao                                           │
├─────────────────────────────────────────────────────────────────┤
│ Mã/Tên: [___________] │ Nhóm: [Dropdown ▼] │ [🔍 Tìm]         │
│ Nhà cung cấp: [_____] │ Tồn kho: [Min] - [Max] │ [🔄 Reset]   │
│ Thiết bị sử dụng: [__] │ Trạng thái: [Active ▼] │             │
└─────────────────────────────────────────────────────────────────┘

[Bảng kết quả với sticky header]
┌─────────────────────────────────────────────────────────────────┐
│ Mã SKU │ Tên phụ tùng │ Nhóm │ Tồn kho │ Đơn giá │ Thiết bị     │
├─────────────────────────────────────────────────────────────────┤
│ SKU001 │ Vòng bi 6205 │ Cơ khí│ 2/50   │ 150K   │ EQ001,EQ003 │
│ SKU002 │ Dầu Shell    │ Hóa   │ 5/100  │ 80K    │ EQ001-EQ010 │
└─────────────────────────────────────────────────────────────────┘
3.5 Module Lịch Bảo trì
3.5.1 Calendar View
Layout:

[Tháng 9/2024] [◀ Tháng trước │ Hôm nay │ Tháng sau ▶]

┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│ CN  │ T2  │ T3  │ T4  │ T5  │ T6  │ T7  │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│  1  │  2  │  3  │  4  │  5  │  6  │  7  │
│     │🔧PM1│     │     │⚠WO3 │     │     │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│  8  │  9  │ 10  │ 11  │ 12  │ 13  │ 14  │
│     │🔧PM2│     │⚠WO1 │     │🔧PM3│     │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 15  │ 16  │ 17  │ 18  │ 19  │ 20  │ 21  │
│     │     │🔧PM4│     │     │⚠WO2 │     │
└─────┴─────┴─────┴─────┴─────┴─────┴─────┘

[Legend]
🔧 Bảo trì định kỳ │ ⚠ Quá hạn │ 📋 Kế hoạch │ ✅ Hoàn thành
3.6 Module Phân quyền Người dùng
3.6.1 Quản lý Người dùng
Role Matrix:

┌─────────────────────────────────────────────────────────────────┐
│ Phân quyền theo Role                                            │
├─────────────────────────────────────────────────────────────────┤
│ Chức năng        │ Admin │ Manager │ Engineer │ Technician │ Op │
├─────────────────────────────────────────────────────────────────┤
│ Quản lý thiết bị │  ✅   │   ✅    │    👁    │     👁     │ 👁 │
│ Tạo WO           │  ✅   │   ✅    │    ✅    │     👁     │ 👁 │
│ Thực hiện WO     │  ✅   │   👁    │    ✅    │     ✅     │ 👁 │
│ Báo cáo sự cố    │  ✅   │   ✅    │    ✅    │     ✅     │ ✅ │
│ Quản lý kho      │  ✅   │   ✅    │    👁    │     👁     │ 👁 │
│ Báo cáo          │  ✅   │   ✅    │    👁    │     👁     │ 👁 │
│ Cài đặt hệ thống │  ✅   │   ❌    │    ❌    │     ❌     │ ❌ │
└─────────────────────────────────────────────────────────────────┘

Legend: ✅ Full access │ 👁 View only │ ❌ No access
4. User Flows
4.1 Flow Báo cáo và Xử lý Sự cố
Cao/Khẩn cấp

Thấp/Trung bình

Operator phát hiện sự cố

Mở app/web CMMS

Chọn ‘Báo cáo sự cố’

Điền form báo cáo

Upload ảnh/video

Gửi báo cáo

Hệ thống tự động phân loại

Gửi notification cho Engineer

Engineer đánh giá mức độ

Mức độ nghiêm trọng?

Tạo WO khẩn cấp

Lên kế hoạch xử lý

Phân công Technician

Technician nhận nhiệm vụ

Thực hiện khắc phục

Cập nhật tiến độ

Hoàn thành và test

Engineer xác nhận

Đóng sự cố


4.2 Flow Bảo trì Định kỳ
Có

Không

Không

Có

Hệ thống check lịch PM

Đến hạn bảo trì?

Tạo notification

Planner xem cảnh báo

Tạo Work Order từ PM template

Kiểm tra tồn kho phụ tùng

Đủ phụ tùng?

Tạo Purchase Request

Lập kế hoạch thực hiện

Phân công Technician

Technician chuẩn bị

Thực hiện bảo trì

Ghi nhận kết quả

Cập nhật lịch PM tiếp theo


5. Thiết kế Database
5.1 Entity Relationship Diagram
has

occurs_on

scheduled_for

uses

consumes

assigned_to

created_by

used_in

belongs_to

tracked_by

has

grants

EQUIPMENT

string

equipment_id

PK

string

name

string

type

string

location

string

status

json

technical_specs

datetime

created_at

WORK_ORDER

string

wo_id

PK

string

equipment_id

FK

string

title

text

description

string

priority

string

status

datetime

scheduled_date

datetime

completed_date

string

assigned_to

FK

INCIDENT

string

incident_id

PK

string

equipment_id

FK

string

category

string

severity

text

description

datetime

occurred_at

string

reported_by

FK

string

status

PM_SCHEDULE

EQUIPMENT_PART

WO_PART

USER

PART

INVENTORY_TRANSACTION

ROLE

PERMISSION


6. Technical Implementation
6.1 Component Architecture
src/
├── components/
│   ├── equipment/
│   │   ├── EquipmentList.jsx
│   │   ├── EquipmentDetail.jsx
│   │   ├── EquipmentForm.jsx
│   │   └── EquipmentCard.jsx
│   ├── maintenance/
│   │   ├── WorkOrderList.jsx
│   │   ├── WorkOrderForm.jsx
│   │   ├── MaintenanceDashboard.jsx
│   │   └── PMSchedule.jsx
│   ├── incident/
│   │   ├── IncidentForm.jsx
│   │   ├── IncidentBoard.jsx
│   │   └── IncidentDetail.jsx
│   ├── inventory/
│   │   ├── PartsList.jsx
│   │   ├── StockAlert.jsx
│   │   └── InventoryDashboard.jsx
│   └── shared/
│       ├── DataTable.jsx
│       ├── FilterBar.jsx
│       ├── StatusBadge.jsx
│       └── DateRangePicker.jsx
├── hooks/
│   ├── useEquipment.js
│   ├── useWorkOrder.js
│   ├── useIncident.js
│   └── useInventory.js
├── services/
│   ├── api.js
│   ├── equipmentService.js
│   ├── maintenanceService.js
│   └── inventoryService.js
└── utils/
    ├── constants.js
    ├── validators.js
    └── formatters.js
6.2 State Management
// Redux Store Structure
{
  equipment: {
    list: [],
    current: null,
    loading: false,
    filters: {}
  },
  workOrders: {
    list: [],
    current: null,
    loading: false,
    dashboard: {}
  },
  incidents: {
    list: [],
    current: null,
    loading: false,
    kanban: {}
  },
  inventory: {
    parts: [],
    alerts: [],
    transactions: [],
    loading: false
  },
  auth: {
    user: null,
    permissions: [],
    isAuthenticated: false
  }
}
7. Câu hỏi Mở
Tích hợp IoT: Có cần tích hợp với sensors để thu thập dữ liệu real-time không?
Mobile App: Có phát triển mobile app riêng cho technician hay chỉ responsive web?
Offline Capability: Technician có cần làm việc offline không?
Barcode/QR: Có sử dụng mã vạch để quản lý thiết bị và phụ tùng không?
Integration: Cần tích hợp với hệ thống ERP/SAP hiện tại không?
Notification: Sử dụng email, SMS hay push notification cho cảnh báo?
Reporting: Có cần báo cáo tự động gửi theo lịch không?
Multi-language: Hệ thống có cần hỗ trợ đa ngôn ngữ không?
8. Kế hoạch Triển khai
Phase 1 (4 tuần)
Quản lý thiết bị cơ bản
Tạo và theo dõi Work Order
Báo cáo sự cố đơn giản
Hệ thống phân quyền cơ bản
Phase 2 (3 tuần)
Quản lý tồn kho phụ tùng
Lịch bảo trì định kỳ
Dashboard và báo cáo
Mobile responsive
Phase 3 (3 tuần)
Tích hợp với hệ thống khác
Advanced reporting
Performance optimization
Testing và deployment
