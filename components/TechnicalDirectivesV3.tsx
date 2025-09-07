
import React from 'react';

const DirectiveItem: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="bg-black/20 p-4 rounded-md border border-[var(--panel-border)]">
        <h4 className="font-orbitron text-lg font-bold text-teal-400 mb-2">
           {number}. <span className="text-white">{title}</span>
        </h4>
        <div className="pl-4 border-l-2 border-teal-500/30 text-gray-400 space-y-3">
            {children}
        </div>
    </div>
);

export const TechnicalDirectivesV3: React.FC = () => {
    return (
        <div className="panel p-6 space-y-6">
            <DirectiveItem number={1} title="Giới hạn timeline giả lập (max 60s)">
                <h5 className="font-semibold text-gray-300">Khi khởi tạo timeline giả lập:</h5>
                <ul className="list-disc list-inside space-y-2">
                    <li>Nếu `video.duration` &gt; 60s:
                        <ul className="list-['-_'] list-inside pl-5 mt-1 space-y-1">
                            <li>Chia video thành các segment 60s.</li>
                            <li>Timeline giả lập chỉ tạo 60 cột keyframe mỗi segment.</li>
                            <li>Thông báo cho người dùng: "Timeline giả lập giới hạn 60s để đảm bảo hiệu năng".</li>
                        </ul>
                    </li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={2} title="Sync FPS video với timeline giả lập">
                 <h5 className="font-semibold text-gray-300">Khi load video:</h5>
                <ul className="list-disc list-inside space-y-2">
                    <li>Đọc FPS của video (`fps_video`).</li>
                    <li>Tính toán số cột: `timeline_columns = 60s * fps_video`.</li>
                    <li>Scale timeline giả lập dựa trên `fps_video`.</li>
                    <li>Khi push keyframe, tính toán `frame_index = video_time * fps_video`.</li>
                    <li>Cảnh báo nếu FPS video không khớp với FPS mặc định của timeline.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={3} title="Auto-map layer Lua">
                <h5 className="font-semibold text-gray-300">Khi push keyframe từ timeline giả lập sang Lua:</h5>
                <ul className="list-disc list-inside space-y-2">
                    <li>Kiểm tra `layer_name` có khớp với tên layer trong Moho không.</li>
                    <li>Nếu không khớp:
                        <ul className="list-['-_'] list-inside pl-5 mt-1 space-y-1">
                            <li>Tìm layer tương tự (fuzzy match, bỏ qua-viết hoa/thường).</li>
                            <li>Hoặc thông báo lỗi: "Layer name changed, keyframe không push được".</li>
                        </ul>
                    </li>
                    <li>Tạo và sử dụng một bảng mapping: `{"timeline_layer_name": "moho_layer_name"}` khi push keyframe.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={4} title="Tách pipeline Camera & Pose AI">
                <h5 className="font-semibold text-gray-300">Khi Camera Plugin bật/tắt:</h5>
                <ul className="list-disc list-inside space-y-2">
                    <li>Tách `pipeline_camera` và `pipeline_pose` thành hai luồng riêng biệt.</li>
                    <li>Khi bật Camera Plugin: `pipeline_camera` chạy lại từ đầu; `pipeline_pose` không bị ảnh hưởng.</li>
                    <li>Khi tắt Camera Plugin: `pipeline_camera` dừng, dữ liệu keyframe được lưu lại.</li>
                    <li>Merge keyframe Camera vào timeline mà không ảnh hưởng đến keyframe Pose.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={5} title="Merge keyframe chuẩn">
                <h5 className="font-semibold text-gray-300">Khi pipeline phân tích lại:</h5>
                <ul className="list-disc list-inside space-y-2">
                    <li>Kiểm tra keyframe trùng lặp (dựa trên frame index và layer) → ghi đè hoặc bỏ qua.</li>
                    <li>Merge keyframe mới vào timeline giả lập, giữ đúng thứ tự và không làm mất keyframe cũ.</li>
                    <li>Khi push sang Lua, keyframe Camera và Pose được đẩy vào các cột tương ứng.</li>
                </ul>
            </DirectiveItem>
            
            <DirectiveItem number={6} title="Icon + cột Moho chuẩn">
                <h5 className="font-semibold text-gray-300">Timeline giả lập UI:</h5>
                <ul className="list-disc list-inside space-y-2">
                    <li>Sử dụng icon giống Moho Studio Pro cho các kỹ thuật camera:
                        <ul className="list-['-_'] list-inside pl-5 mt-1 space-y-1">
                            <li><strong>Tracking:</strong> icon [+] (phím tắt 4)</li>
                            <li><strong>Zoom:</strong> icon kính lúp (phím tắt 5)</li>
                            <li><strong>Rotate:</strong> icon xoay (phím tắt 6)</li>
                            <li><strong>Tilt/Scan:</strong> icon nghiêng (phím tắt 7)</li>
                        </ul>
                    </li>
                    <li>Mỗi kỹ thuật camera có một cột riêng và keyframe xuất hiện đúng cột.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={7} title="Hiển thị trạng thái phân tích">
                <h5 className="font-semibold text-gray-300">Khi AI phân tích video:</h5>
                <ul className="list-disc list-inside space-y-2">
                    <li>Hiển thị progress bar với % hoàn thành và segment hiện tại.</li>
                    <li>Thêm nút "Cancel" để dừng pipeline và giữ lại các keyframe đã phân tích.</li>
                    <li>Thông báo lỗi rõ ràng nếu phân tích thất bại.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={8} title="Cảnh báo & hiệu năng">
                <h5 className="font-semibold text-gray-300">Khi video dài hoặc chạy đồng thời Camera + Pose:</h5>
                 <ul className="list-disc list-inside space-y-2">
                    <li>Hiển thị cảnh báo: "Video dài, có thể lag, giới hạn phân tích 60s mỗi segment".</li>
                    <li>Giới hạn chỉ một pipeline được chạy tại một thời điểm để đảm bảo hiệu năng.</li>
                </ul>
            </DirectiveItem>
            
            <div className="bg-black/20 p-4 rounded-md border border-teal-500/30 text-center">
                 <h4 className="font-orbitron text-lg font-bold text-teal-300">✅ Kết quả mong muốn:</h4>
                 <p className="text-gray-300 mt-2 text-sm">
                    Timeline giả lập ổn định (max 60s, sync FPS). Keyframe Camera & Pose không trùng/lệch, merge chuẩn. Layer Lua mapping tự động hoặc có cảnh báo. UI trực quan, icon chuẩn Moho. AI pipeline tách biệt. UX tốt hơn với progress/cancel.
                </p>
            </div>
        </div>
    );
};
