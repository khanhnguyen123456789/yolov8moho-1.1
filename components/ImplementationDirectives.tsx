
import React from 'react';
import { CodeBlock } from './CodeBlock';

const SectionHeader: React.FC<{ title: string; className?: string }> = ({ title, className = '' }) => (
    <h3 className={`text-2xl font-semibold text-white border-l-4 border-teal-400 pl-4 font-orbitron ${className}`}>{title}</h3>
);

const TaskDirective: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="bg-black/20 p-4 rounded-md border border-[var(--panel-border)]">
        <h4 className="font-orbitron text-lg font-bold text-teal-400 mb-2">
           {number}️⃣ <span className="text-white">{title}</span>
        </h4>
        <div className="pl-4 border-l-2 border-teal-500/30 text-gray-400 space-y-3">
            {children}
        </div>
    </div>
);

// --- CODE SNIPPETS ---
const task1Code = `
# Backend AI - Python
# Đồng bộ timeline giả lập với FPS của video
video_fps = get_video_fps(video_path)
timeline_columns = video_fps * video_duration_seconds

# Nếu timeline giả lập hiện tại không khớp -> resize
if fake_timeline.columns != timeline_columns:
    fake_timeline.resize(columns=timeline_columns)
    log("Timeline giả lập đã được đồng bộ với FPS video")
`;

const task2Code = `
-- Lua mapping (Moho scripting)
local layer_name = "Character_01"
local layer = moho:FindLayerByName(layer_name)

if layer == nil then
    alert("Layer '" .. layer_name .. "' không tồn tại!")
    return
end

-- Push keyframe chỉ khi layer tồn tại
layer:AddKeyFrame(frame_index, key_value)
`;

const task3Code = `
# Backend AI - Python
def toggle_camera_plugin(on_off):
    if on_off:
        camera_pipeline.reset()
        analyze_camera(video_segment)
        log("Camera Plugin: Bật và phân tích lại keyframe")
    else:
        camera_pipeline.clear_cache()
        log("Camera Plugin: Tắt, giữ pose pipeline")
`;

const task4Code = `
# Backend AI - Python
# Khi camera plugin đã phân tích xong, merge keyframe
for frame in timeline_frames:
    pose_kf = pose_pipeline.get_keyframe(frame)
    cam_kf = camera_pipeline.get_keyframe(frame)

    merged_kf = merge_keyframes(pose_kf, cam_kf)
    timeline.set_keyframe(frame, merged_kf)
`;

const task5Code = `
# Backend AI - Python
MAX_SEGMENT_SEC = 60  # giới hạn 60 giây/segment

video_segments = split_video(video_path, MAX_SEGMENT_SEC)
for segment in video_segments:
    pose_pipeline.analyze(segment)
    if camera_plugin_enabled:
        camera_pipeline.analyze(segment)
`;

const task6Code = `
-- Lua mapping (Moho scripting)
-- Drag & Drop Keyframe (logic handled in UI code)
fake_timeline:SetDraggable(true) 
-- Tooltip and Color examples
fake_timeline:SetTooltip("Keyframe Camera: Zoom/Rotate/Pan/Tilt")
fake_timeline:SetColorScheme({
    zoom="#FFD700", 
    rotate="#1E90FF", 
    pan="#32CD32", 
    tilt="#FF4500"
})
`;

const task7Code = `
# Python Backend
if video_fps != fake_timeline.fps:
    warning("FPS video khác timeline, có thể lệch keyframe")

# Lua Script
if layer_name not in moho_layers:
    warning(f"Layer '{layer_name}' không tồn tại trong Moho")
`;

export const ImplementationDirectives: React.FC = () => {
    return (
        <div className="panel p-6 space-y-10">
            <div>
                <SectionHeader title="Chỉ thị Bổ sung: Sửa lỗi & Tối ưu hóa" className="mb-6" />
                <div className="space-y-6">
                    <TaskDirective number={1} title="Đồng bộ Timeline giả lập với FPS video">
                        <p>Keyframe camera phải chính xác từng frame để tránh lệch khi render với pose của nhân vật. Timeline giả lập cần được tự động điều chỉnh theo FPS của video đầu vào.</p>
                        <CodeBlock code={task1Code} language="python" />
                    </TaskDirective>
                    <TaskDirective number={2} title="Kiểm tra Layer Name trước khi push Keyframe">
                        <p>Ngăn chặn lỗi ghi keyframe sai chỗ khi người dùng đổi tên layer trong Moho bằng cách xác thực tên layer trước khi thực hiện thao tác.</p>
                        <CodeBlock code={task2Code} language="lua" />
                    </TaskDirective>
                    <TaskDirective number={3} title="Reset Pipeline khi bật/tắt Camera Plugin">
                        <p>Để tránh trùng lặp hoặc mất keyframe, pipeline phân tích camera phải được reset và chạy lại từ đầu mỗi khi người dùng bật lại plugin.</p>
                        <CodeBlock code={task3Code} language="python" />
                    </TaskDirective>
                    <TaskDirective number={4} title="Merge Logic Keyframe Pose + Camera">
                        <p>Khi plugin camera phân tích xong, dữ liệu keyframe của nó phải được hợp nhất (merge) một cách thông minh với dữ liệu pose đã có, đảm bảo không có sự sai lệch.</p>
                        <CodeBlock code={task4Code} language="python" />
                    </TaskDirective>
                     <TaskDirective number={5} title="Giới hạn thời gian phân tích để tăng hiệu năng">
                        <p>Để tối ưu hóa hiệu năng cho máy cấu hình yếu và tránh treo khi xử lý video dài, backend sẽ tự động chia video thành các đoạn 60 giây để xử lý tuần tự.</p>
                        <CodeBlock code={task5Code} language="python" />
                    </TaskDirective>
                     <TaskDirective number={6} title="Cải thiện UX cho Timeline giả lập">
                        <p>Mang lại trải nghiệm quen thuộc cho người dùng Moho bằng cách cho phép kéo/thả keyframe, thêm tooltip và mã màu cho từng loại keyframe camera (Zoom, Rotate, Pan/Tilt).</p>
                        <CodeBlock code={task6Code} language="lua" />
                    </TaskDirective>
                     <TaskDirective number={7} title="Cảnh báo FPS hoặc Layer Mismatch">
                        <p>Chủ động thông báo sớm cho người dùng về các lỗi tiềm ẩn như không khớp FPS hoặc sai tên layer để giảm thiểu các sự cố runtime.</p>
                        <CodeBlock code={task7Code} language="python" />
                    </TaskDirective>
                </div>
            </div>
        </div>
    );
};
