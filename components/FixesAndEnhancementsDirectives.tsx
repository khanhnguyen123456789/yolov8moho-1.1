
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

export const FixesAndEnhancementsDirectives: React.FC = () => {
    return (
        <div className="panel p-6 space-y-6">
            <DirectiveItem number={1} title="Giới hạn Timeline giả lập">
                <ul className="list-disc list-inside space-y-2">
                    <li>Chỉ phân tích tối đa 60 giây đầu tiên của video.</li>
                    <li>Nếu video &gt; 60s, chia video thành các segment 60s.</li>
                    <li>Mỗi segment được xử lý độc lập nhưng timeline giả lập phải sync keyframe liên tục.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={2} title="Tách pipeline AI Camera & Pose">
                <ul className="list-disc list-inside space-y-2">
                    <li>Tách hẳn pipeline Camera và Pose.</li>
                    <li>Chức năng Camera Plugin: ON → chỉ load pipeline Camera, phân tích segment 60s.</li>
                    <li>Chức năng Pose: ON → chỉ load pipeline Pose.</li>
                    <li>Cả hai pipeline có thể bật/tắt độc lập, không chạy đồng thời nếu muốn tối ưu hiệu năng.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={3} title="Frame sync / FPS">
                 <ul className="list-disc list-inside space-y-2">
                    <li>Timeline giả lập phải match exact FPS video.</li>
                    <li>Nếu video FPS khác chuẩn → scale keyframe tương ứng.</li>
                    <li>Kiểm tra và báo lỗi nếu FPS không khớp.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={4} title="Lua Mapping / Layer Name">
                 <ul className="list-disc list-inside space-y-2">
                    <li>Tất cả keyframe push lên Lua phải match chính xác tên layer trong Moho.</li>
                    <li>Nếu user đổi tên layer → hiện alert + cung cấp chức năng auto-map.</li>
                    <li>Khi merge keyframe segment 60s với segment trước → tránh duplicate và overwrite.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={5} title="Merge Keyframe Segment">
                 <ul className="list-disc list-inside space-y-2">
                    <li>Khi Camera Plugin tắt rồi bật lại → phân tích lại từ đầu segment 60s.</li>
                    <li>Merge keyframe mới với keyframe cũ trên timeline giả lập → tránh trùng/lỗi.</li>
                    <li>Keyframe timeline giả lập giữ icon và cột theo chuẩn Moho Studio Pro (theo thứ tự: Theo dõi, Zoom, Xoay, Quét/Nghiêng).</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={6} title="UX / Timeline Navigation">
                 <ul className="list-disc list-inside space-y-2">
                    <li>Timeline giả lập giới hạn hiển thị 60s → hiển thị scrollbar hoặc navigation next/prev segment.</li>
                    <li>Hiển thị progress bar khi phân tích.</li>
                    <li>Cho phép cancel phân tích giữa chừng.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={7} title="Performance / Hardware Safety">
                 <ul className="list-disc list-inside space-y-2">
                    <li>Nếu video &gt; 60s hoặc bật cả 2 pipeline → warning: CPU/GPU load cao.</li>
                    <li>Nếu phát hiện lag → auto giảm FPS timeline giả lập tạm thời để tránh treo.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={8} title="Camera + Pose Integration">
                 <ul className="list-disc list-inside space-y-2">
                    <li>Khi phân tích Camera → timeline giả lập chỉ push keyframe Camera.</li>
                    <li>Khi phân tích Pose → timeline giả lập chỉ push keyframe Pose.</li>
                    <li>Nếu bật cả 2 → timeline hiển thị keyframe tách cột riêng, tránh chồng lên nhau.</li>
                </ul>
            </DirectiveItem>

            <DirectiveItem number={9} title="Testing / QA">
                 <ul className="list-disc list-inside space-y-2">
                    <li>Kiểm tra với video 60s, 120s, 180s.</li>
                    <li>Thay đổi tên layer → keyframe vẫn push đúng hoặc auto-map.</li>
                    <li>FPS mismatch → timeline scale chính xác.</li>
                    <li>Bật/tắt Camera Plugin nhiều lần → keyframe merge không lỗi.</li>
                    <li>UI / UX: icon Moho, progress, scrollbar hiển thị chính xác.</li>
                </ul>
            </DirectiveItem>
            
            <div className="bg-black/20 p-4 rounded-md border border-[var(--panel-border)] text-center">
                 <h4 className="font-orbitron text-lg font-bold text-teal-400">Kết quả mong muốn:</h4>
                 <p className="text-gray-300 mt-2">Timeline 60s, pipeline độc lập, UX trực quan, và hiệu năng tối ưu.</p>
            </div>
        </div>
    );
};
