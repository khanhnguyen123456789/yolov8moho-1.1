
import React from 'react';
import { CodeBlock } from './CodeBlock';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h3 className="text-2xl font-semibold mb-6 text-white border-l-4 border-teal-400 pl-4 font-orbitron">{title}</h3>
);

const TaskItem: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="bg-black/20 p-4 rounded-md border border-[var(--panel-border)]">
        <h4 className="font-orbitron text-lg font-bold text-teal-400 mb-2">
            TASK {number}: <span className="text-white">{title}</span>
        </h4>
        <div className="pl-4 border-l-2 border-teal-500/30 text-gray-400 space-y-2">
            {children}
        </div>
    </div>
);

const pythonDataStructureCode = `
# Cấu trúc dữ liệu trong Python
timeline_data = {
    1: {  # frameIndex
        "pose": [{"x": 120, "y": 230, "conf": 0.9}, ...], # 17 keypoints
        "camera": {
            "track": {"enabled": True, "value": [5.0, 2.0]},
            "zoom": {"enabled": False, "value": 1.0},
            # ...
        }
    },
    2: { ... },
}
`;

export const DeploymentOrder: React.FC = () => {
    return (
        <div className="panel p-6 space-y-10">
            <div className="text-center mb-6 border-b border-gray-700 pb-6">
                <p className="text-gray-500">Gửi: Lập trình viên Trưởng</p>
                <p className="text-lg text-gray-300">
                    <strong>Chủ đề:</strong> Yêu cầu phát triển plugin "Yolov8Moho" cho Moho Studio Pro, tích hợp module phân tích tư thế và camera đồng bộ theo thời gian thực.
                </p>
            </div>

            <div>
                <SectionHeader title="I. Tổng quan Dự án 🎯" />
                <p className="text-gray-400 mb-4"><strong>Mục tiêu:</strong> Xây dựng một plugin cho Moho Studio Pro giúp tự động tạo keyframe hoạt hình 2D bằng cách phân tích video. Plugin phải có khả năng phân tích đồng bộ tư thế nhân vật (Pose) và chuyển động máy quay (Camera) theo thời gian thực, hiển thị trên một timeline hợp nhất và cho phép xuất dữ liệu ra Moho một cách liền mạch.</p>
                <h4 className="font-semibold text-gray-300 mb-2">Công nghệ chủ đạo:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li><strong>Ngôn ngữ:</strong> Python 3.9+</li>
                    <li><strong>Giao diện Người dùng (GUI):</strong> PyQt6 hoặc PySide6</li>
                    <li><strong>AI / Computer Vision:</strong> OpenCV, PyTorch (cho YOLOv8)</li>
                    <li><strong>Tương tác với Moho:</strong> Scripting bằng Lua 5.4</li>
                </ul>
            </div>
            
            <div>
                <SectionHeader title="II. Kiến trúc Hệ thống 🏛️" />
                <p className="text-gray-400 mb-4">Plugin trên PC sẽ hoạt động như một ứng dụng độc lập, được cấu thành từ các module chính sau:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li><strong>AI Orchestrator (Bộ điều phối AI):</strong> Lõi trung tâm, chịu trách nhiệm điều phối luồng dữ liệu và các module phân tích.</li>
                    <li><strong>Pose Analysis Module (Module Phân tích Tư thế):</strong> Chạy trên một luồng riêng (thread), sử dụng YOLOv8 để trích xuất 17 keypoints.</li>
                    <li><strong>Camera Analysis Module (Module Phân tích Camera):</strong> Chạy song song trên một luồng riêng, sử dụng OpenCV để phân tích chuyển động camera.</li>
                    <li><strong>Unified Timeline UI (Giao diện Timeline Hợp nhất):</strong> Giao diện chính để hiển thị kết quả và cho phép người dùng tương tác.</li>
                    <li><strong>Lua Bridge (Cầu nối Lua):</strong> Module chịu trách nhiệm tạo script Lua để xuất dữ liệu vào Moho.</li>
                </ul>
            </div>

            <div>
                <SectionHeader title="III. Tác vụ Phát triển Chi tiết (Actionable Tasks) 📋" />
                <p className="text-gray-400 mb-6">Bạn hãy thực hiện các tác vụ sau theo thứ tự:</p>
                <div className="space-y-6">
                    <TaskItem number={1} title="Xây dựng Giao diện Plugin (UI Shell)">
                        <ul className="list-disc list-inside space-y-1">
                            <li>Sử dụng PyQt6/PySide6 để tạo cửa sổ chính của plugin.</li>
                            <li>Thiết kế layout theo bản vẽ GUI đã thống nhất, bao gồm:
                                <ul className="list-['-_'] list-inside pl-4">
                                    <li>Các nút chức năng chính: [Import Video], [Export to Moho].</li>
                                    <li>Công tắc [Camera Plugin ON/OFF].</li>
                                    <li>Khu vực Timeline Hợp nhất.</li>
                                    <li>Thanh trạng thái (Status Bar).</li>
                                </ul>
                            </li>
                        </ul>
                    </TaskItem>
                    <TaskItem number={2} title="Tích hợp Module Phân tích Tư thế (YOLOv8)">
                        <ul className="list-disc list-inside space-y-1">
                            <li>Tích hợp model YOLOv8-pose.</li>
                            <li>Viết một lớp (class) <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">PoseAnalyzer</code> có hàm <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">process_frame(frame)</code> nhận đầu vào là một frame ảnh và trả về một cấu trúc dữ liệu chứa 17 keypoints.</li>
                            <li>Toàn bộ logic xử lý của lớp này phải được thiết kế để chạy trên một QThread riêng biệt.</li>
                        </ul>
                    </TaskItem>
                    <TaskItem number={3} title="Tích hợp Module Phân tích Camera (OpenCV)">
                        <ul className="list-disc list-inside space-y-1">
                            <li>Viết một lớp <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">CameraAnalyzer</code> có hàm <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">process_frame(frame_t, frame_t-1)</code>.</li>
                            <li>Bên trong lớp này, triển khai:
                                 <ul className="list-['-_'] list-inside pl-4">
                                    <li>Sử dụng <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">cv2.calcOpticalFlowFarneback</code>.</li>
                                    <li>Từ luồng quang học, viết các hàm con để suy ra các thông số: <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">detect_pan_tilt()</code>, <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">detect_zoom()</code>, <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">detect_roll()</code>.</li>
                                    <li>Triển khai <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">detect_shot_scale()</code>.</li>
                                </ul>
                            </li>
                            <li>Lớp này cũng phải được thiết kế để chạy trên một QThread riêng biệt.</li>
                        </ul>
                    </TaskItem>
                    <TaskItem number={4} title="Xây dựng Timeline Hợp nhất (Unified Timeline Widget)">
                        <ul className="list-disc list-inside space-y-1">
                            <li>Tạo một widget tùy chỉnh (custom widget) kế thừa từ QWidget.</li>
                            <li>Widget phải có khả năng hiển thị các hàng (row) và vẽ các keyframe (▓ cho tư thế, 🔵 🔴 🟢 🟡 cho camera).</li>
                            <li>Cung cấp hàm <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">update_timeline(frameIndex, data)</code>.</li>
                        </ul>
                    </TaskItem>
                    <TaskItem number={5} title="Lập trình Bộ điều phối AI (AI Orchestrator)">
                        <ul className="list-disc list-inside space-y-1">
                            <li>Đọc video frame-by-frame.</li>
                            <li>Với mỗi frame, chạy song song hai luồng PoseAnalyzer và CameraAnalyzer.</li>
                            <li>Thu thập kết quả, cập nhật timeline và lưu trữ dữ liệu.</li>
                        </ul>
                    </TaskItem>
                    <TaskItem number={6} title="Xây dựng Cầu nối Lua (Lua Bridge)">
                        <ul className="list-disc list-inside space-y-1">
                            <li>Viết hàm <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">generate_lua_script(timeline_data)</code>.</li>
                            <li>Script Lua kết quả phải có khả năng lặp qua dữ liệu và đặt keyframe vào Moho bằng <code className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded-md font-mono text-sm">channel:SetValue(frame, value)</code>.</li>
                        </ul>
                    </TaskItem>
                </div>
            </div>

            <div>
                 <SectionHeader title="IV. Yêu cầu về Cấu trúc Dữ liệu 📝" />
                 <p className="text-gray-400 mb-4">Vui lòng tuân thủ cấu trúc dữ liệu sau cho timeline hợp nhất:</p>
                 <CodeBlock code={pythonDataStructureCode} language="python" />
            </div>

            <div>
                 <SectionHeader title="V. Yêu cầu về Trải nghiệm Người dùng (UX) 🌟" />
                 <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Plugin phải phản hồi nhanh. Luồng xử lý AI không được làm treo giao diện.</li>
                    <li>Sử dụng tooltip cho tất cả các nút để giải thích chức năng.</li>
                    <li>Hiển thị thanh tiến trình (progress bar) trong quá trình phân tích video.</li>
                 </ul>
            </div>
        </div>
    );
};
