# Hướng dẫn Sơ yếu lý lịch hoàn hảo thân thiện với ATS

Tài liệu này tổng hợp các nguyên tắc thiết kế tối ưu để tạo một sơ yếu lý lịch thân thiện với Hệ thống theo dõi ứng viên (ATS), đảm bảo khả năng phân tích tối đa và tăng cơ hội được xem xét bởi nhà tuyển dụng.

## 1. Mã thông báo cấu trúc & bố cục:

*   **`layout-type`**: `single-column`
    *   *Mô tả*: **Nghiêm ngặt tuân thủ bố cục một cột.**
    *   *Chi tiết*: Bố cục nhiều cột, thanh bên hoặc cấu trúc lưới phức tạp thường gây nhầm lẫn cho phần mềm ATS, dẫn đến thông tin bị xáo trộn hoặc không thể đọc được. Luồng đơn giản, tuyến tính đảm bảo ATS có thể phân tích nội dung của bạn một cách chính xác từ trên xuống dưới.
    *   *Ví dụ*: Hãy hình dung sơ yếu lý lịch của bạn như một tài liệu đơn giản chảy như một trang sách, không phải một trang tạp chí.

*   **`section-order`**: `chronological-reverse`
    *   *Mô tả*: **Liệt kê kinh nghiệm làm việc, học vấn và các phần liên quan khác từ gần đây nhất đến cũ nhất.**
    *   *Chi tiết*: Đây là định dạng phổ biến nhất và được ATS ưa thích. Nó cho phép nhà tuyển dụng và ATS nhanh chóng xác định những thành tựu gần đây và phù hợp nhất của bạn.
    *   *Ví dụ*: Công việc hiện tại hoặc gần đây nhất của bạn nên nằm ở đầu phần "Kinh nghiệm làm việc", tiếp theo là các vai trò trước đó theo thứ tự giảm dần về độ gần đây.

*   **`header-placement`**: `body-content`
    *   *Mô tả*: **Đặt thông tin liên hệ và tên của bạn trong phần nội dung chính của sơ yếu lý lịch, không phải trong tiêu đề hoặc chân trang.**
    *   *Chi tiết*: Một số ATS có thể không đọc thông tin được đặt trong tiêu đề hoặc chân trang tài liệu. Để đảm bảo tên và thông tin liên hệ của bạn được thu thập, hãy đảm bảo chúng là một phần của luồng văn bản chính, thường là ở ngay đầu tài liệu.
    *   *Ví dụ*:
        ```
        Dương Bảo Duy
        baoduy.duong0206@gmail.com | https://github.com/bdx0 | https://bdx0.io.vn
        ```

*   **`spacing-consistency`**: `standard`
    *   *Mô tả*: **Duy trì khoảng cách dòng, ngắt đoạn và lề nhất quán trong toàn bộ tài liệu.**
    *   *Chi tiết*: Khoảng cách không đều hoặc khoảng trắng quá mức đôi khi có thể bị ATS hiểu sai, dẫn đến lỗi phân tích. Hãy tuân thủ định dạng tài liệu tiêu chuẩn.
    *   *Ví dụ*: Sử dụng khoảng cách nhất quán giữa các dấu đầu dòng và các phần. Tránh các khoảng trống lớn, tùy tiện.

## 2. Mã thông báo kiểu chữ:

*   **`font-family-primary`**: `[Arial, Calibri, Times New Roman, Georgia, Tahoma, Trebuchet, Verdana]`
    *   *Mô tả*: **Chọn một phông chữ chuyên nghiệp, được công nhận rộng rãi và dễ đọc từ danh sách này.**
    *   *Chi tiết*: Các phông chữ này là tiêu chuẩn trên hầu hết các hệ thống và dễ dàng được ATS xử lý. Tránh các phông chữ trang trí cao, tùy chỉnh hoặc không rõ ràng có thể không hiển thị chính xác hoặc có thể bị ATS bỏ qua.
    *   *Ví dụ*: Calibri 11pt là một lựa chọn an toàn và phổ biến.

*   **`font-size-body`**: `11pt` | `12pt`
    *   *Mô tả*: **Sử dụng cho văn bản chính để đảm bảo khả năng đọc.**
    *   *Chi tiết*: Phạm vi này cung cấp sự cân bằng tốt giữa việc chứa đủ thông tin trên một trang và duy trì khả năng đọc cho cả ATS và mắt người.
    *   *Ví dụ*: Giữ các mô tả và dấu đầu dòng của bạn trong phạm vi kích thước này.

*   **`font-size-heading`**: `14pt` | `16pt`
    *   *Mô tả*: **Sử dụng cho các tiêu đề phần để cung cấp hệ thống phân cấp rõ ràng.**
    *   *Chi tiết*: Kích thước phông chữ lớn hơn một chút cho các tiêu đề giúp chia nhỏ sơ yếu lý lịch một cách trực quan và hướng dẫn người đọc (và ATS) qua các phần khác nhau.
    *   *Ví dụ*: "KINH NGHIỆM LÀM VIỆC" có thể là 14pt, trong khi tên của bạn ở trên cùng có thể là 18-24pt.

*   **`font-weight-heading`**: `bold`
    *   *Mô tả*: **Các tiêu đề phần nên được in đậm để nhấn mạnh.**
    *   *Chi tiết*: Văn bản in đậm thường được ATS nhận dạng là một cách để làm nổi bật thông tin quan trọng hoặc tiêu đề phần.
    *   *Ví dụ*: **Kinh nghiệm làm việc**, **Học vấn**, **Kỹ năng**.

*   **`text-alignment`**: `left`
    *   *Mô tả*: **Tất cả văn bản nên được căn trái để dễ đọc tiêu chuẩn.**
    *   *Chi tiết*: Văn bản căn giữa hoặc căn phải đôi khi có thể gây ra sự cố phân tích với ATS cũ hơn. Căn trái là lựa chọn an toàn nhất.
    *   *Ví dụ*: Đảm bảo tất cả các dấu đầu dòng và đoạn văn của bạn bắt đầu từ lề trái.

*   **`text-color`**: `black-on-white`
    *   *Mô tả*: **Sử dụng màu chữ đen trên nền trắng cho tất cả nội dung.**
    *   *Chi tiết*: ATS chủ yếu trích xuất nội dung văn bản và thường bỏ qua hoặc loại bỏ màu sắc. Độ tương phản cao (đen trên trắng) đảm bảo khả năng đọc tối đa cho cả ATS và nhà tuyển dụng, bất kể cài đặt hiển thị hay in ấn. Tránh bất kỳ màu nào khác cho văn bản.
    *   *Ví dụ*: Tất cả các tiêu đề, văn bản chính và thông tin liên hệ nên có màu đen.

## 3. Mã thông báo nội dung & định dạng:

*   **`section-headings`**: `[Summary, Professional Experience, Education, Technical Skills, Additional Information, Certifications, Projects, Awards, Volunteer Experience]`
    *   *Mô tả*: **Chỉ sử dụng các tiêu đề phần tiêu chuẩn, được công nhận rộng rãi.**
    *   *Chi tiết*: ATS được lập trình để tìm kiếm các tiêu đề phổ biến này. Các tiêu đề sáng tạo hoặc độc đáo (ví dụ: "Hành trình của tôi" thay vì "Kinh nghiệm làm việc") có thể khiến ATS bỏ lỡ toàn bộ các phần trong sơ yếu lý lịch của bạn.
    *   *Ví dụ*: Tuân thủ "Summary," "Professional Experience," "Education," "Technical Skills," "Additional Information," "Projects," "Awards," "Certifications," "Volunteer Experience."

*   **`bullet-style`**: `[solid-circle, open-circle, square]`
    *   *Mô tả*: **Sử dụng dấu đầu dòng đơn giản, tiêu chuẩn cho danh sách các thành tích và trách nhiệm.**
    *   *Chi tiết*: Các ký tự dấu đầu dòng phức tạp, tùy chỉnh hoặc đồ họa có thể bị ATS hiểu sai hoặc bỏ qua. Các dấu đầu dòng cơ bản được nhận dạng phổ biến.
    *   *Ví dụ*: Sử dụng tùy chọn dấu đầu dòng mặc định trong trình xử lý văn bản của bạn.

*   **`date-format`**: `[MM/YYYY, Month YYYY]`
    *   *Mô tả*: **Duy trì định dạng ngày tháng nhất quán (ví dụ: "01/2020" hoặc "Tháng 1 2020") và đặt ngày tháng ngay cạnh mục tương ứng.**
    *   *Chi tiết*: Tính nhất quán giúp ATS trích xuất chính xác dòng thời gian việc làm và học vấn. Đặt ngày tháng rõ ràng với các mục liên quan của chúng giúp tránh nhầm lẫn.
    *   *Ví dụ*:
        ```
        Rever Corp, City, Country | Senior Software Engineer | 06/2019 – 12/2022
        Ho Chi Minh University of Science, City, Country | Bachelor in Mathematics & Computer Science | Sept 2007 – May 2013
        ```

*   **`keyword-integration`**: `natural`
    *   *Mô tả*: **Tích hợp các từ khóa và cụm từ liên quan trực tiếp từ mô tả công việc một cách tự nhiên vào các phần kinh nghiệm và kỹ năng của bạn.**
    *   *Chi tiết*: Điều này rất quan trọng để sơ yếu lý lịch của bạn khớp với các yêu cầu công việc trong ATS. Đừng chỉ liệt kê các từ khóa; hãy lồng ghép chúng vào các thành tích và trách nhiệm của bạn. Tránh "nhồi nhét từ khóa."
    *   *Ví dụ*: Nếu mô tả công việc đề cập đến "phần mềm quản lý dự án" và "phương pháp agile," hãy đảm bảo các thuật ngữ này xuất hiện trong mô tả kinh nghiệm làm việc của bạn khi thích hợp.

*   **`avoid-graphics`**: `true`
    *   *Mô tả*: **Không bao gồm hình ảnh, biểu đồ, đồ thị, biểu tượng hoặc các yếu tố hình ảnh khác, bao gồm ảnh đại diện.**
    *   *Chi tiết*: ATS không thể "đọc" hình ảnh. Bất kỳ thông tin nào chứa trong đồ họa sẽ bị mất. Đồ họa cũng có thể làm gián đoạn quá trình phân tích văn bản. Ảnh đại diện là một điểm không tuân thủ phổ biến có thể cản trở quá trình phân tích.
    *   *Ví dụ*: Thay vì biểu tượng cho "điện thoại," chỉ cần liệt kê số điện thoại của bạn. **Tuyệt đối không bao gồm ảnh đại diện.**

*   **`avoid-tables`**: `true`
    *   *Mô tả*: **Không sử dụng bảng, hộp văn bản hoặc bố cục nhiều cột cho nội dung, vì những thứ này thường có thể bị ATS hiểu sai.**
    *   *Chi tiết*: Tương tự như đồ họa, bảng, hộp văn bản và cấu trúc nhiều cột phức tạp có thể phá vỡ luồng văn bản tuyến tính, khiến ATS đọc sai hoặc bỏ qua nội dung. Điều này đặc biệt có vấn đề đối với các phần như "Kỹ năng."
    *   *Ví dụ*: Nếu bạn có phần "Kỹ năng", hãy liệt kê các kỹ năng dưới dạng dấu đầu dòng hoặc văn bản được phân tách bằng dấu phẩy, không phải trong bảng hoặc lưới nhiều cột.

*   **`avoid-special-characters`**: `true`
    *   *Mô tả*: **Tránh các ký hiệu bất thường, ký tự có dấu hoặc biểu tượng cảm xúc có thể bị hiểu sai.**
    *   *Chi tiết*: Tuân thủ các ký tự chữ và số tiêu chuẩn và dấu câu phổ biến. Một số ký tự đặc biệt có thể không được ATS mã hóa chính xác.
    *   *Ví dụ*: Sử dụng "e.g." thay vì "e.g." nếu trình xử lý văn bản của bạn tự động định dạng nó bằng một ký tự đặc biệt.

*   **`avoid-decorative-elements`**: `true`
    *   *Mô tả*: **Tránh các đường kẻ ngang, đường viền, đổ bóng hoặc các yếu tố hình ảnh không cần thiết khác.**
    *   *Chi tiết*: Mặc dù có vẻ nhỏ, nhưng các yếu tố này đôi khi có thể bị ATS hiểu sai là định dạng phức tạp, có khả năng dẫn đến lỗi phân tích hoặc trích xuất văn bản kém sạch sẽ hơn. Sự đơn giản là chìa khóa để tương thích ATS tối ưu.
    *   *Ví dụ*: Không sử dụng các đường kẻ ngang để phân tách các phần; hãy dựa vào khoảng cách, in đậm và kích thước phông chữ để tạo hệ thống phân cấp trực quan.

*   **`file-format-preference`**: `[docx, pdf-ats-optimized]`
    *   *Mô tả*: **Lưu sơ yếu lý lịch của bạn dưới dạng tệp .docx. Nếu yêu cầu PDF, hãy đảm bảo đó là PDF thực sự được tối ưu hóa cho ATS.**
    *   *Chi tiết*: .docx thường là định dạng thân thiện với ATS nhất. Nếu yêu cầu PDF, hãy đảm bảo đó là PDF "có thể tìm kiếm" được tạo bằng cách lưu trực tiếp từ trình xử lý văn bản, không phải hình ảnh được quét của tài liệu. Các tệp PDF được quét là hình ảnh và không thể đọc được bởi ATS.
    *   *Ví dụ*: Luôn kiểm tra ứng dụng việc làm để biết định dạng tệp ưa thích. Nếu không được chỉ định, .docx thường là an toàn nhất.

## 4. Mã thông báo ngôn ngữ & giọng điệu:

*   **`language-clarity`**: `concise-direct`
    *   *Mô tả*: **Sử dụng ngôn ngữ rõ ràng, súc tích và trực tiếp.**
    *   *Chi tiết*: Đi thẳng vào vấn đề. Tránh biệt ngữ khi có thể sử dụng các thuật ngữ đơn giản hơn, nhưng sử dụng thuật ngữ chuyên ngành khi đó là từ khóa từ mô tả công việc.
    *   *Ví dụ*: Thay vì "Tôi muốn thu hẹp khoảng cách giữa công nghệ và tương tác của con người. Tôi sẽ làm cho phần mềm đơn giản hơn, tốt hơn," hãy viết "Đam mê thu hẹp khoảng cách giữa công nghệ và tương tác của con người để tạo ra phần mềm đơn giản, tốt hơn."

*   **`action-verbs`**: `strong-impactful`
    *   *Mô tả*: **Bắt đầu các dấu đầu dòng bằng các động từ hành động mạnh mẽ.**
    *   *Chi tiết*: Các động từ hành động (ví dụ: "Developed," "Managed," "Implemented," "Achieved") làm cho các thành tích của bạn nghe có vẻ năng động và có tác động hơn.
    *   *Ví dụ*: "Developed mobile app using Flutter."

*   **`proofreading-standard`**: `error-free`
    *   *Mô tả*: **Kiểm tra kỹ lưỡng mọi lỗi chính tả, ngữ pháp hoặc dấu câu.**
    *   *Chi tiết*: Ngay cả những lỗi nhỏ cũng có thể phản ánh không tốt về sự chú ý đến chi tiết và tính chuyên nghiệp của bạn. ATS cũng có thể hiểu sai các từ khóa bị sai chính tả.
    *   *Ví dụ*: Sử dụng các công cụ kiểm tra chính tả và ngữ pháp, và lý tưởng nhất là nhờ người khác xem lại sơ yếu lý lịch của bạn.