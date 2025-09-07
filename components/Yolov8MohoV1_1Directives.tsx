
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
-- Lua pseudo code
-- Kiểm tra existence layer trước khi push keyframe
function validateLayer(layerName)
    local layer = moho:Layer(layerName)
    if not layer then
        alert("Layer '"..layerName.."' không tồn tại. Vui lòng kiểm tra tên layer.")
        return false
    end
    return true
end
`;

const task2Code = `
# Python pseudo code
# Sync timeline giả lập với FPS video
video_fps = 60
timeline_length = len(video_frames)
timeline_columns = timeline_length

if timeline_columns != video_fps * video_duration_seconds:
    scale_factor = (video_fps * video_duration_seconds) / timeline_columns
    timeline_columns = int(timeline_columns * scale_factor)
`;

const task3Code = `
# Python pseudo code
def merge_camera_keyframes(existing_keyframes, new_keyframes):
    for frame, value in new_keyframes.items():
        if frame in existing_keyframes:
            # Option 1: overwrite existing
            existing_keyframes[frame] = value
        else:
            existing_keyframes[frame] = value
    return existing_keyframes
`;

const task4Code = `
# Python pseudo code
MAX_SEGMENT_DURATION = 60  # giây

video_length = get_video_length()
segments = []

for start in range(0, video_length, MAX_SEGMENT_DURATION):
    end = min(start + MAX_SEGMENT_DURATION, video_length)
    segments.append((start, end))

# AI chỉ chạy segment-by-segment, async
for seg in segments:
    process_segment(seg)
`;

const task5Code = `
-- Lua pseudo code
-- Thêm tooltip & highlight keyframe
function drawKeyframeIcon(frameIndex, keyframeType)
    local icon = getIcon(keyframeType)  -- Camera / Pose
    drawIcon(frameIndex, icon)
    if mouseHover(frameIndex) then
        showTooltip("Frame: "..frameIndex.." Type: "..keyframeType)
    end
end

-- Highlight keyframe đang chọn
function highlightKeyframe(frameIndex)
    drawHighlight(frameIndex, color="yellow")
end
`;


export const Yolov8MohoV1_1Directives: React.FC = () => {
    return (
        <div className="panel p-6 space-y-10">
            <div className="space-y-6">
                <TaskDirective number={1} title="Layer mapping – kiểm tra và cảnh báo">
                    <p>Bất cứ keyframe push nào phải validate layer trước. Nếu người dùng đổi tên layer, phải có cảnh báo và không push keyframe sai.</p>
                    <CodeBlock code={task1Code} language="lua" />
                </TaskDirective>
                <TaskDirective number={2} title="Timeline sync với FPS video">
                    <p>Timeline giả lập phải có số cột tương ứng với số frame của video để keyframe được đặt chính xác. Ví dụ, video 60 FPS thì timeline phải có 60 cột mỗi giây.</p>
                    <CodeBlock code={task2Code} language="python" />
                </TaskDirective>
                <TaskDirective number={3} title="Merge keyframe khi bật lại Camera Plugin">
                    <p>Khi Camera Plugin được kích hoạt lại, chỉ merge các keyframe mới vào timeline, tránh việc tạo keyframe trùng lặp hoặc làm mất dữ liệu cũ.</p>
                    <CodeBlock code={task3Code} language="python" />
                </TaskDirective>
                <TaskDirective number={4} title="Backend AI pipeline – giới hạn phân tích để tăng hiệu năng">
                    <p>Giảm lag và tải cho CPU/GPU bằng cách chia video thành các đoạn nhỏ (tối đa 60 giây) và xử lý tuần tự hoặc bất đồng bộ.</p>
                    <CodeBlock code={task4Code} language="python" />
                </TaskDirective>
                <TaskDirective number={5} title="GUI Timeline giả lập – trực quan hóa keyframe">
                    <p>Cải thiện trải nghiệm người dùng bằng cách thêm tooltip hiển thị loại keyframe (Camera/Pose), highlight keyframe khi được chọn hoặc hover, và sử dụng màu sắc icon theo chuẩn của Moho.</p>
                    <CodeBlock code={task5Code} language="lua" />
                </TaskDirective>

                {/* Checklist Table */}
                <div className="bg-black/20 p-4 rounded-md border border-[var(--panel-border)]">
                    <h4 className="font-orbitron text-lg font-bold text-teal-400 mb-4">6️⃣ Tóm tắt checklist cho lập trình viên</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Mục</th>
                                    <th scope="col" className="px-6 py-3">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">Layer mapping</th>
                                    <td className="px-6 py-4">Validate layer trước khi push keyframe</td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">Timeline sync</th>
                                    <td className="px-6 py-4">Sync timeline giả lập = FPS video</td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">Merge keyframe</th>
                                    <td className="px-6 py-4">Merge khi bật lại Camera Plugin, tránh duplicate/lost</td>
                                </tr>
                                 <tr className="border-b border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">Backend AI</th>
                                    <td className="px-6 py-4">Chia segment 60s, async pipeline Pose + Camera</td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">GUI timeline</th>
                                    <td className="px-6 py-4">Tooltip + Highlight + màu icon chuẩn Moho</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">Error handling</th>
                                    <td className="px-6 py-4">Alert người dùng khi layer hoặc timeline mismatch</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
