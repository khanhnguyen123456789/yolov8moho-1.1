
import React from 'react';

const TaskSection: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="bg-black/20 p-4 rounded-md border border-[var(--panel-border)]">
        <h4 className="font-orbitron text-lg font-bold text-teal-400 mb-2">
           {number}️⃣ <span className="text-white">{title}</span>
        </h4>
        <div className="pl-4 border-l-2 border-teal-500/30 text-gray-400 space-y-3">
            {children}
        </div>
    </div>
);

export const FixDirectives: React.FC = () => {
    return (
        <div className="panel p-6 space-y-6">
            <TaskSection number={1} title="Đồng bộ timeline giả lập với FPS video">
                <p className="font-semibold text-gray-300 italic">// Task: Timeline giả lập phải đồng bộ với FPS video gốc</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Khi người dùng import video, đọc FPS của video (ví dụ: 24, 30, 60).</li>
                    <li>Tạo timeline giả lập với số cột = số frame của video / FPS.</li>
                    <li>Tất cả keyframe Camera/Pose phải map chính xác tới cột tương ứng trên timeline giả lập.</li>
                    <li>Nếu video FPS thay đổi hoặc người dùng chỉnh lại FPS → update timeline và re-map tất cả keyframe.</li>
                    <li>Test với video 60 FPS, timeline giả lập 60 cột → keyframe trùng khớp.</li>
                </ol>
                <p className="mt-2 text-sm text-teal-300">✅ <strong>Mục tiêu:</strong> Không lệch keyframe, không mất frame, giữ nguyên hành động gốc.</p>
            </TaskSection>
            
            <TaskSection number={2} title="Layer mapping & validation">
                <p className="font-semibold text-gray-300 italic">// Task: Lua mapping phải match exact layer name trong Moho</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Khi push keyframe Camera/Pose → kiểm tra layer name hiện tại trong Moho.</li>
                    <li>Nếu layer name bị đổi (rename) → show alert cho user: "Layer name mismatch: keyframe sẽ không push đúng".</li>
                    <li>Cung cấp tùy chọn: auto-map layer mới → update Lua mapping để tránh mất keyframe.</li>
                    <li>Test trường hợp layer rename + import layer mới → keyframe vẫn push đúng.</li>
                </ol>
                <p className="mt-2 text-sm text-teal-300">✅ <strong>Mục tiêu:</strong> Tránh mất keyframe, duplicate, hoặc push sai layer.</p>
            </TaskSection>

            <TaskSection number={3} title="Bật / Tắt Camera Plugin">
                <p className="font-semibold text-gray-300 italic">// Task: Tách riêng pipeline Camera để bật/tắt độc lập với Pose</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Khi Camera Plugin OFF → bỏ phân tích frame Camera, giữ Pose pipeline hoạt động bình thường.</li>
                    <li>Khi bật Camera Plugin ON:
                        <ul className="list-[lower-alpha] list-inside pl-5 mt-1 space-y-1">
                            <li>Load lại video segment hoặc toàn bộ video.</li>
                            <li>Chỉ phân tích Camera keyframe, bỏ qua Pose.</li>
                            <li>Merge keyframe mới với timeline giả lập, tránh duplicate.</li>
                        </ul>
                    </li>
                    <li>Kiểm tra merge:
                        <ul className="list-disc list-inside pl-5 mt-1 space-y-1">
                            <li>Nếu keyframe đã tồn tại → overwrite hoặc skip tùy chọn user.</li>
                            <li>Nếu keyframe mới → append đúng cột frame timeline.</li>
                        </ul>
                    </li>
                    <li>Sau khi merge xong → sync với timeline Moho chính thức.</li>
                </ol>
                <p className="mt-2 text-sm text-teal-300">✅ <strong>Mục tiêu:</strong> Plugin bật/tắt không làm mất keyframe, không duplicate, workflow liên tục.</p>
            </TaskSection>

            <TaskSection number={4} title="Giới hạn phân tích AI video dài">
                <p className="font-semibold text-gray-300 italic">// Task: Tránh crash / lag khi video dài</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Khi video &gt; 60s → phân tích theo segments 60s (chunked).</li>
                    <li>Mỗi segment chạy song song Camera hoặc Pose → giới hạn RAM/CPU.</li>
                    <li>Sau khi phân tích xong segment → merge keyframe vào timeline giả lập.</li>
                    <li>Cung cấp progress bar + cancel button cho user.</li>
                    <li>Test với video 5 phút, 30 FPS → plugin không lag / crash.</li>
                </ol>
                <p className="mt-2 text-sm text-teal-300">✅ <strong>Mục tiêu:</strong> Trải nghiệm mượt mà, tránh treo máy.</p>
            </TaskSection>

            <TaskSection number={5} title="GUI trực quan & chuẩn Moho">
                <p className="font-semibold text-gray-300 italic">// Task: Timeline giả lập & icon keyframe trực quan</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Timeline giả lập có:
                        <ul className="list-disc list-inside pl-5 mt-1 space-y-1">
                            <li>Hàng riêng cho Camera.</li>
                            <li>Hàng riêng cho Pose.</li>
                            <li>Cột frame tương ứng với FPS video.</li>
                        </ul>
                    </li>
                    <li>Keyframe hiển thị icon Moho quen thuộc:
                        <ul className="list-disc list-inside pl-5 mt-1 space-y-1">
                            <li>Theo dõi camera: icon camera + dấu cộng.</li>
                            <li>Thu phóng camera: icon zoom.</li>
                            <li>Xoay camera: icon rotate.</li>
                            <li>Quét/nghiêng camera: icon tilt.</li>
                        </ul>
                    </li>
                    <li>Tooltip khi hover keyframe → show frame number + action.</li>
                    <li>Click keyframe → highlight → dễ chỉnh sửa.</li>
                    <li>Khi timeline giả lập sync với Moho chính → có nút push / copy keyframe sang Moho.</li>
                </ol>
                <p className="mt-2 text-sm text-teal-300">✅ <strong>Mục tiêu:</strong> Người dùng Moho cảm giác quen thuộc, thao tác trực quan, không cần học lại GUI mới.</p>
            </TaskSection>

            <TaskSection number={6} title="Kiểm tra rủi ro & QA">
                <p className="font-semibold text-gray-300 italic">// Task: Test rủi ro tiềm ẩn sau khi vá</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Video FPS khác nhau: 24, 30, 60 → timeline sync.</li>
                    <li>Layer rename + import layer mới → keyframe push đúng.</li>
                    <li>Bật/tắt Camera Plugin nhiều lần → keyframe merge chính xác.</li>
                    <li>Video dài 5–10 phút → plugin không lag / crash.</li>
                    <li>GUI: icon + tooltip hiển thị chính xác, dễ thao tác.</li>
                    <li>AI pipeline: phân tích Camera và Pose tách biệt → hiệu năng ổn định.</li>
                </ol>
                <p className="mt-2 text-sm text-teal-300">✅ <strong>Mục tiêu:</strong> Plugin an toàn, UX thân thiện, rủi ro kỹ thuật tối thiểu.</p>
            </TaskSection>
        </div>
    );
};
