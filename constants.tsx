
import React from 'react';
import { TechStackItem, FeatureDetail, RoadmapPhase, HardwareSpec, ProjectGoal, EcosystemComponent, ReleaseChecklistItem, SprintPhase, DocumentationArticle } from './types';
import { TwoBoneLayerDiagram } from './components/TwoBoneLayerDiagram';
import { VoiceControlButton } from './components/VoiceControlButton';
import { BoneMappingUI } from './components/BoneMappingUI';
import { AndroidUIMockup } from './components/AndroidUIMockup';
import { MotionFilterUI } from './components/MotionFilterUI';
import { GpuSelectionUI } from './components/GpuSelectionUI';
import { SessionRecoveryUI } from './components/SessionRecoveryUI';
import { WebcamIntegrationDiagram } from './components/WebcamIntegrationDiagram';
import { PerformanceStatsUI } from './components/PerformanceStatsUI';
import { UserApiManagementDiagram } from './components/UserApiManagementDiagram';
import { BatchProcessingUI } from './components/BatchProcessingUI';
import { VideoManagerUI } from './components/VideoManagerUI';


export const APP_LOGO_BASE64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAH0AfQDASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAECAwQFBgf/xAAyEAEAAgICAQIDBgYDAQAAAAAAAQIDEQQSIQUxQRNRYQZxgZEiIzKhscHRQlLh8BRSYv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z';

// SVG Icons
const PythonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-400">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 5h2v2h-2V7zm0 4h2v8h-2v-8z" fill="#306998" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2v-8h2v8z" fill="#FFD43B" transform="rotate(180 12 12)" />
    </svg>
);
const LuaIcon = () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="64" cy="64" r="64" fill="#000080" />
        <circle cx="64" cy="64" r="50" fill="#fff" />
        <path d="m64 21a43 43 0 0 0 -43 43 43 43 0 0 0 43 43 43 43 0 0 0 43-43h-43z" fill="#000080" />
    </svg>
);
const QtIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M21 9.873a8.43 8.43 0 0 0-7.39-7.39V15c0 3.308 2.692 6 6 6s6-2.692 6-6c0-.88-.135-1.727-.386-2.527H21v-2.6h-4.13a8.43 8.43 0 0 0-7.39-7.39V15c0 3.308 2.692 6 6 6s6-2.692 6-6c0-3.309-2.692-6-6-6V2.483a8.43 8.43 0 0 0-7.39 7.39H18.52v2.6H8.483A8.43 8.43 0 0 0 1 15c0 4.686 3.814 8.5 8.5 8.5s8.5-3.814 8.5-8.5v-5.127z" fill="#41cd52" />
    </svg>
);
const TensorFlowLiteIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-500">
        <path fill="currentColor" d="m15.32 14.89l-4.59.02c-.33 0-.6-.27-.6-.6V8.18c0-.33.27-.6.6-.6l4.59-.02c.33 0 .6.27.6.6v6.13c0 .33-.27.6-.6.6m4.6-9.33l-3.32.02c-.33 0-.6-.27-.6-.6V1.66c0-.33.27-.6.6-.6l3.32-.02c.33 0 .6.27.6.6v3.32c0 .33-.27.6-.6.6M4.08 5.56l3.32.02c.33 0 .6.27.6.6v3.32c0 .33-.27.6-.6.6l-3.32-.02c-.33 0-.6-.27-.6-.6V6.16c0-.33.27-.6.6-.6m5.63 15.78l-4.59.02c-.33 0-.6-.27-.6-.6V14.6c0-.33.27-.6.6-.6l4.59-.02c.33 0 .6.27.6.6v6.16c0 .33-.27.6-.6.6" />
    </svg>
);
const OpenCvIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.93 5.33c1.3.01 2.4 1.11 2.4 2.4s-1.1 2.39-2.4 2.4c-1.3 0-2.4-1.08-2.4-2.4 0-1.29 1.1-2.4 2.4-2.4zm-3.34 6.94c.64 0 1.16.52 1.16 1.16s-.52 1.16-1.16 1.16-1.16-.52-1.16-1.16.52-1.16 1.16-1.16zm8.54 0c.64 0 1.16.52 1.16 1.16s-.52 1.16-1.16 1.16-1.16-.52-1.16-1.16.52-1.16 1.16-1.16z" fill="#00ff00"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.93 5.33c-1.3-.01-2.4 1.11-2.4 2.4s1.1 2.39 2.4 2.4c1.3 0 2.4-1.08 2.4-2.4 0-1.29-1.1-2.4-2.4-2.4z" fill="#ff0000"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#0000ff" fillOpacity="0.8"/>
    </svg>
);
const AndroidStudioIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500">
        <path fill="currentColor" d="m21.43 14.1l-2.28-1.31l-5.36-3.1a.39.39 0 0 0-.39 0L8.06 12.8L5.8 14.12a.37.37 0 0 0-.19.33v2.61a.38.38 0 0 0 .19.33l2.26 1.31l5.36 3.1a.39.39 0 0 0 .39 0l5.36-3.1l2.26-1.31a.38.38 0 0 0 .19-.33v-2.63c0-.14-.08-.26-.19-.33M15.5 12l-3.5-2.02l-3.5 2.02l3.5 2.02l3.5-2.02m-4.08 7.07v-4.04l-2.2-1.27v4.04l2.2 1.27M12 4.1L3 9.35v5.3L12 20l9-5.35V9.35L12 4.1Z"/>
    </svg>
);
const VSCodeIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500">
        <path fill="currentColor" d="M21.17 14.17L14.83 20.5l-2.58-2.58l3.75-3.75l-3.75-3.75l2.58-2.58l6.34 6.34a2 2 0 0 1 0 2.82M3.59 3.59a2 2 0 0 0 0 2.82l6.34 6.34l-6.34 6.34a2 2 0 0 0 0 2.82l2.83 2.83a2 2 0 0 0 2.82 0l6.34-6.34l-2.58-2.58l-3.75 3.75l-3.75-3.75l3.75-3.75L9.24 6.41L2.9 12.76L1.5 11.34V5a1.4 1.4 0 0 1 1.4-1.4h6.34l-1.42 1.41l-6.33-6.42Z"/>
    </svg>
);
const WebSocketIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-teal-400">
        <path fill="currentColor" d="M16.3 3.34a2.91 2.91 0 0 0-4.11 0l-1.14 1.13a.5.5 0 0 1-.7 0L9.2 3.34a2.91 2.91 0 0 0-4.11 0L3.34 5.09a2.91 2.91 0 0 0 0 4.11l1.13 1.14a.5.5 0 0 1 0 .7l-1.13 1.14a2.91 2.91 0 0 0 0 4.11l1.75 1.75a2.91 2.91 0 0 0 4.11 0l1.14-1.13a.5.5 0 0 1 .7 0l1.14 1.13a2.91 2.91 0 0 0 4.11 0l1.75-1.75a2.91 2.91 0 0 0 0-4.11l-1.13-1.14a.5.5 0 0 1 0-.7l1.13-1.14a2.91 2.91 0 0 0 0-4.11l-1.75-1.75ZM7.75 9a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5Zm0 8a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5Zm4.5-4a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5Zm4.5 4a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5Zm0-8a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5Z"/>
    </svg>
);
const MicrophoneIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-400">
        <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85c-.25 2.29-2.24 4.15-4.93 4.15s-4.68-1.86-4.93-4.15c-.08-.49-.49-.85-.98-.85c-.55 0-1 .45-1 1c0 .43.1.84.28 1.23C6.73 14.28 8.69 16 11 16v3.99c0 .55.45 1 1 1s1-.45 1-1V16c2.31 0 4.27-1.72 4.63-4.77c.18-.39.28-.8.28-1.23c0-.55-.45-1-1-1z" />
    </svg>
);
const QrCodeIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-300">
        <path fill="currentColor" d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm-6 8h8v-8h-8v8zm2-6h4v4h-4v-4z"/>
    </svg>
);
const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 0H4v2h12V5zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 0H4v2h12v-2z" clipRule="evenodd" />
  </svg>
);
const SmartphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

// Doc icons
const VideoManagementIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const UserFocusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <circle cx="12" cy="12" r="10" strokeOpacity="0.5" />
    </svg>
);


export const TECH_STACK_PROGRAMMING: TechStackItem[] = [
  { name: 'Python 3.11+', icon: <PythonIcon />, description: 'Ngôn ngữ chính cho plugin Moho, xử lý AI và server.' },
  { name: 'Lua Scripting', icon: <LuaIcon />, description: 'Tích hợp sâu với Moho Studio Pro cho các tác vụ tùy chỉnh.' },
  { name: 'PyQt6 / PySide6', icon: <QtIcon />, description: 'Xây dựng giao diện người dùng mạnh mẽ, đa nền tảng cho plugin.' },
];
export const TECH_STACK_AI: TechStackItem[] = [
  { name: 'TensorFlow Lite', icon: <TensorFlowLiteIcon />, description: 'Triển khai mô hình AI hiệu quả trên Android và PC.' },
  { name: 'OpenCV-Python', icon: <OpenCvIcon />, description: 'Thư viện xử lý hình ảnh và video thời gian thực.' },
  { name: 'WebSockets', icon: <WebSocketIcon />, description: 'Giao tiếp real-time giữa điện thoại và PC với độ trễ thấp.' },
];
export const TECH_STACK_TOOLS: TechStackItem[] = [
  { name: 'Android Studio', icon: <AndroidStudioIcon />, description: 'Môi trường phát triển chính cho ứng dụng Android.' },
  { name: 'VS Code', icon: <VSCodeIcon />, description: 'Editor chính để phát triển plugin Python.' },
  { name: 'Microphone API', icon: <MicrophoneIcon />, description: 'Điều khiển bằng giọng nói trên ứng dụng Android.' },
  { name: 'QR Code Scanner', icon: <QrCodeIcon />, description: 'Kết nối nhanh chóng và dễ dàng giữa các thiết bị.' },
];
export const ANDROID_FEATURES: FeatureDetail[] = [
    {
        title: 'Tinh chỉnh Pose Thời gian thực & Phản hồi Trực quan',
        description: 'Giao diện cung cấp phản hồi AI theo thời gian thực. Các khớp xương được tô màu theo độ tin cậy (confidence score) và vị trí các khớp bị che khuất (occlusion) được dự đoán trực quan, cho phép người dùng đánh giá ngay lập tức chất lượng của dữ liệu motion capture.',
        interactiveComponent: AndroidUIMockup,
    },
    {
        title: 'Công nghệ Lọc Nâng cao',
        description: 'Để đảm bảo dữ liệu chuyển động mượt mà và ổn định, hệ thống tích hợp các thuật toán tiên tiến. Bộ lọc Kalman được sử dụng để loại bỏ hiện tượng rung (jitter) giữa các khung hình. Đồng thời, mô hình dự đoán chuyển động giúp xử lý các trường hợp bị mờ do chuyển động nhanh (motion blur), tạo ra một luồng dữ liệu liền mạch và chính xác.',
    },
    {
        title: 'Điều khiển linh hoạt',
        description: 'Hỗ trợ bắt đầu/dừng ghi hình bằng nút bấm, lệnh giọng nói, và đặc biệt là qua tai nghe Bluetooth, giúp animator rảnh tay hoàn toàn để tập trung vào diễn xuất.',
        interactiveComponent: VoiceControlButton,
    },
    {
        title: 'Lựa chọn chế độ xử lý',
        description: 'Người dùng có thể chuyển đổi giữa chế độ "Siêu tốc" (sử dụng mô hình int8, nhanh hơn, phù hợp để xem trước) và "Chính xác" (sử dụng mô hình float32, chi tiết hơn, phù hợp cho bản ghi cuối).',
    },
];

export const WEBCAM_INTEGRATION_PYTHON_EXAMPLE = `
import cv2

# Mở webcam mặc định của PC (thiết bị 0)
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Lỗi: Không thể mở webcam.")
    exit()

while True:
    # Đọc từng khung hình từ webcam
    ret, frame = cap.read()
    if not ret:
        print("Không thể nhận khung hình. Đang thoát...")
        break

    # -- TÍCH HỢP AI TẠI ĐÂY --
    # 1. Gửi 'frame' tới mô hình AI nhận dạng tư thế
    # keypoints = pose_estimation_model.predict(frame)
    # 2. Gửi 'keypoints' tới Moho qua WebSocket
    # websocket_client.send(keypoints)

    # Hiển thị cửa sổ xem trước (tùy chọn)
    cv2.imshow('Webcam Motion Capture Preview', frame)

    # Nhấn 'q' để dừng
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Giải phóng webcam và đóng cửa sổ
cap.release()
cv2.destroyAllWindows()
`;

export const MOHO_PLUGIN_FEATURES: FeatureDetail[] = [
    {
        title: 'Kiến trúc Cốt lõi: Hệ thống "Hai Lớp Xương"',
        description: 'Giải pháp đột phá để đồng bộ chuyển động AI với mọi loại rig. Plugin tạo một "Lớp Proxy" (bản sao ảo của rig) và áp dụng các phép biến đổi (xoay, tỷ lệ) từ "Lớp Dữ liệu" (dữ liệu AI thô) lên nó. Điều này đảm bảo chuyển động tự nhiên, tôn trọng hệ thống rig gốc và không phá vỡ cấu trúc xương.',
        diagram: TwoBoneLayerDiagram,
    },
     {
        title: 'Retargeting Studio: Ánh xạ & Tùy chỉnh Rig Nâng cao',
        description: 'Một giao diện trực quan cho phép người dùng kéo-thả các điểm keypoint của AI vào các xương tương ứng trên rig nhân vật. Tích hợp Inverse Kinematics (IK) để tự động tính toán góc xoay, ngăn ngừa các lỗi phổ biến như trượt chân. Người dùng có thể lưu và tải các cấu hình ánh xạ (retargeting profiles) cho các loại nhân vật khác nhau, giúp tăng tốc quy trình làm việc.',
        interactiveComponent: BoneMappingUI
    },
    {
        title: 'Motion Editor & Timeline',
        description: 'Trình biên tập cho phép tinh chỉnh dữ liệu chuyển động ở cấp độ keyframe. Người dùng có thể chọn, di chuyển, và xóa các keyframe lỗi trên một timeline trực quan. Cung cấp các bộ lọc nâng cao như làm mượt (smoothing), giảm rung (jitter reduction), và phóng đại chuyển động (motion exaggeration) để tinh chỉnh nghệ thuật.',
        interactiveComponent: MotionFilterUI,
    },
    {
        title: 'Xử lý Hàng loạt (Batch Processing)',
        description: 'Tiết kiệm thời gian bằng cách cho phép người dùng xử lý hàng loạt video. Chỉ cần kéo và thả một thư mục chứa video, plugin sẽ tự động phân tích và xuất ra các tệp dữ liệu hoạt hình tương ứng cho mỗi video, tối ưu hóa quy trình làm việc cho các dự án lớn.',
        interactiveComponent: BatchProcessingUI,
    },
    {
        title: 'Tối ưu hóa Hiệu suất với GPU',
        description: "Plugin tích hợp một hệ thống lựa chọn thiết bị xử lý AI thông minh và linh hoạt. Nó tự động phát hiện và ưu tiên thiết bị theo thứ tự: GPU rời (dGPU) mạnh nhất, GPU trên đám mây miễn phí (Google Colab/Kaggle), và cuối cùng là CPU. Trong trường hợp kết nối với dịch vụ đám mây không ổn định hoặc bị gián đoạn, hệ thống sẽ tự động chuyển về xử lý bằng CPU để đảm bảo công việc không bị gián đoạn. Người dùng cũng sẽ nhận được cảnh báo khi phiên làm việc trên đám mây sắp hết hạn, cho phép họ lưu lại công việc kịp thời.",
        interactiveComponent: GpuSelectionUI,
    },
    {
        title: 'Bảng Điều Khiển Thống Kê Hiệu Suất',
        description: 'Tích hợp một màn hình thống kê hiệu suất thời gian thực ngay trong plugin, hiển thị các thông số quan trọng như FPS của AI, độ trễ mạng (WebSocket), thời gian xử lý mỗi khung hình, tỷ lệ sử dụng tài nguyên (CPU/GPU/Memory), và điểm tin cậy trung bình của các khớp xương.',
        interactiveComponent: PerformanceStatsUI,
    },
    {
        title: 'Quản lý Phiên làm việc & Phục hồi',
        description: "Để bảo vệ công việc của người dùng khỏi những sự cố bất ngờ như mất điện hoặc crash, plugin sẽ tự động lưu toàn bộ trạng thái làm việc (ánh xạ xương, cài đặt bộ lọc, vị trí các cửa sổ, v.v.) vào một tệp tạm `session.autosave` sau mỗi vài phút. Tệp này sẽ **luôn được giữ lại** nếu ứng dụng bị đóng đột ngột. Khi Moho khởi động lại, plugin sẽ ngay lập tức kiểm tra sự tồn tại của tệp này và nếu tìm thấy, người dùng sẽ nhận được thông báo đề xuất khôi phục lại phiên làm việc trước đó. Tệp tạm `session.autosave` sẽ **chỉ bị xóa** khi người dùng chủ động lưu dự án, đóng Moho một cách bình thường, hoặc sau khi khôi phục/từ chối khôi phục thành công. Cơ chế này đảm bảo an toàn tối đa cho dữ liệu và giữ cho không gian làm việc luôn sạch sẽ.",
        interactiveComponent: SessionRecoveryUI,
    },
    {
        title: 'Tích hợp Webcam Trực tiếp trên PC',
        description: 'Cung cấp sự linh hoạt tối đa bằng cách cho phép animator sử dụng webcam của PC làm nguồn motion capture trực tiếp. Tính năng này sử dụng OpenCV để lấy luồng video, sau đó đưa qua cùng một engine AI mạnh mẽ để xử lý tư thế, tạo ra một giải pháp thay thế tiện lợi cho ứng dụng Android mà không cần thêm thiết bị.',
        diagram: WebcamIntegrationDiagram,
        codeExample: {
          title: 'Ví dụ: Lấy Video từ Webcam bằng OpenCV (Python)',
          code: WEBCAM_INTEGRATION_PYTHON_EXAMPLE,
          language: 'python',
        },
    },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  { phase: 1, title: 'Xây Dựng Nền Tảng (MVP)', description: 'Hoàn thiện các tính năng cốt lõi của ứng dụng Android và plugin Moho.', status: 'completed', tasks: ['Ứng dụng Android với lọc keyframe thông minh', 'Plugin Moho với kiến trúc "Hai Lớp Xương"', 'Kết nối WebSocket cơ bản', 'Motion Editor cơ bản'] },
  { phase: 2, title: 'Tối Ưu Hóa & Giao Diện Chuyên Sâu', description: 'Cải thiện hiệu suất và hoàn thiện giao diện người dùng.', status: 'completed', tasks: ['Tích hợp hỗ trợ GPU', 'Hoàn thiện Bone Toolkit', 'Triển khai hệ thống User Feedback chi tiết'] },
  { phase: 3, title: 'Tính Năng Đột Phá', description: 'Phát triển các tính năng nâng cao, tạo sự khác biệt.', status: 'completed', tasks: ['Phát triển Root Motion và Secondary Motion', 'Tích hợp bộ xử lý video trên PC với Object Tracking'] },
  { phase: 4, title: 'Hoàn Thiện, Triển Khai và Hỗ Trợ', description: 'Kiểm thử, phát hành và cung cấp tài liệu.', status: 'completed', tasks: ['Kiểm thử toàn diện trên nhiều cấu hình', 'Phát hành phiên bản chính thức', 'Cung cấp tài liệu chi tiết và video hướng dẫn'] },
];

export const HARDWARE_ANDROID: HardwareSpec[] = [
    { spec: 'HĐH', value: 'Android 8.0 (Oreo)+' },
    { spec: 'CPU', value: 'Snapdragon 865+ hoặc tương đương' },
    { spec: 'RAM', value: '4GB+' },
];

export const HARDWARE_PC: HardwareSpec[] = [
    { spec: 'HĐH', value: 'Windows 10+ hoặc macOS' },
    { spec: 'CPU', value: 'Intel Core i5 thế hệ 12 hoặc tương đương' },
    { spec: 'RAM', value: '8GB (Khuyến nghị 16GB)' },
    { spec: 'GPU', value: 'NVIDIA GeForce GTX 1050+ (Hỗ trợ iGPU & dGPU)' },
];

export const POSE_DATA_JSON_EXAMPLE = `{
  "timestamp": 1678886400.123,
  "frame_id": 101,
  "poses": [
    {
      "person_id": 0,
      "keypoints": [
        { "name": "nose", "x": 320.5, "y": 180.2, "confidence": 0.95 },
        { "name": "left_eye", "x": 330.1, "y": 175.8, "confidence": 0.92 },
        { "name": "right_shoulder", "x": 290.7, "y": 210.4, "confidence": 0.88 },
        // ... 14 more keypoints
      ]
    }
  ]
}`;

export const PROJECT_GOALS: ProjectGoal[] = [
    { title: 'Tự động hóa', description: 'Giảm thiểu tối đa thời gian keyframe thủ công qua việc trích xuất chuyển động tự động.' },
    { title: 'Tối ưu hóa', description: 'Tận dụng sức mạnh phần cứng PC và mobile để xử lý AI hiệu quả, quy trình làm việc mượt mà.' },
    { title: 'Nâng cao Tự nhiên', description: 'Tạo ra các chuyển động chân thực, có hồn, tuân thủ các nguyên tắc diễn hoạt kinh điển.' },
    { title: 'Trao quyền Tùy biến', description: 'Cung cấp bộ công cụ mạnh mẽ để animator tinh chỉnh, kiểm soát và sáng tạo không giới hạn.' },
];

export const ECOSYSTEM_COMPONENTS: EcosystemComponent[] = [
    { 
        title: 'Ứng Dụng Android', 
        icon: <SmartphoneIcon />, 
        description: '"Trạm Thu Hoạch Chuyển Động" - Biến điện thoại thành một máy motion capture di động, thông minh.' 
    },
    { 
        title: 'Plugin Moho', 
        icon: <ServerIcon />, 
        description: '"Trạm Chỉ Huy Hoạt Hình" - Trung tâm điều khiển, nơi dữ liệu AI được tiếp nhận, tinh chỉnh và áp dụng.' 
    },
];

export const KEYFRAME_FILTERING_LOGIC_PSEUDOCODE = `
# Constants
VELOCITY_THRESHOLD = 0.05       # Ngưỡng vận tốc tối thiểu
ANGLE_CHANGE_THRESHOLD = 5.0    # Ngưỡng thay đổi góc (độ)
POSE_DIFF_THRESHOLD = 0.1       # Ngưỡng khác biệt tư thế tổng thể

# Main loop
last_keyframe_pose = None
current_pose = get_current_pose()

if last_keyframe_pose is None:
    save_keyframe(current_pose)
    last_keyframe_pose = current_pose
else:
    # 1. Kiểm tra vận tốc của các điểm quan trọng (tay, chân)
    velocity = calculate_velocity(current_pose, last_keyframe_pose)
    if max(velocity) > VELOCITY_THRESHOLD:
        save_keyframe(current_pose)
        last_keyframe_pose = current_pose
        continue

    # 2. Kiểm tra thay đổi góc của các khớp chính (khuỷu tay, đầu gối)
    angle_change = calculate_angle_change(current_pose, last_keyframe_pose)
    if max(angle_change) > ANGLE_CHANGE_THRESHOLD:
        save_keyframe(current_pose)
        last_keyframe_pose = current_pose
        continue

    # 3. Kiểm tra sự khác biệt tổng thể của tư thế
    pose_difference = compare_poses(current_pose, last_keyframe_pose)
    if pose_difference > POSE_DIFF_THRESHOLD:
        save_keyframe(current_pose)
        last_keyframe_pose = current_pose
        continue
`;

export const QR_CODE_SERVER_PYTHON_EXAMPLE = `
import qrcode
import socket
import PySide6.QtWidgets as qtw
import PySide6.QtGui as qtg

def get_ip_address():
    # ... (function to get local IP)
    return "192.168.1.100"

class MohoPluginWindow(qtw.QWidget):
    def __init__(self):
        super().__init__()
        self.qr_label = qtw.QLabel("QR Code will be here")
        
        # Generate QR Code
        ip = get_ip_address()
        port = 8765
        qr_data = f"{ip}:{port}"
        
        img = qrcode.make(qr_data)
        # ... (convert PIL image to QPixmap)
        
        self.qr_label.setPixmap(pixmap)
`;

export const QR_CODE_SCANNER_KOTLIN_EXAMPLE = `
import com.journeyapps.barcodescanner.ScanContract
import com.journeyapps.barcodescanner.ScanOptions

// Register the scanner launcher
val barcodeLauncher = registerForActivityResult(ScanContract()) { result ->
    if (result.contents != null) {
        val address = result.contents // e.g., "192.168.1.100:8765"
        val parts = address.split(":")
        val ip = parts[0]
        val port = parts[1].toInt()
        
        connectToWebSocket(ip, port)
    }
}

fun launchScanner() {
    val options = ScanOptions()
    options.setPrompt("Quét mã QR trên plugin Moho")
    options.setBeepEnabled(true)
    options.setOrientationLocked(false)
    barcodeLauncher.launch(options)
}
`;


export const WEBSOCKET_SERVER_PYTHON_EXAMPLE = `
import asyncio
import websockets

async def handler(websocket, path):
    print("Client connected!")
    try:
        async for message in websocket:
            # message is the JSON string from Android
            process_pose_data(message) 
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected.")

start_server = websockets.serve(handler, "0.0.0.0", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
`;

export const WEBSOCKET_CLIENT_KOTLIN_EXAMPLE = `
import okhttp3.*
import okio.ByteString

class WebSocketListener : okhttp3.WebSocketListener() {
    override fun onOpen(webSocket: WebSocket, response: Response) {
        println("WebSocket connection opened!")
    }

    override fun onMessage(webSocket: WebSocket, text: String) {
        // Handle incoming messages (if any)
    }
    
    // ... other override methods
}

fun connect(ip: String, port: Int) {
    val client = OkHttpClient()
    val request = Request.Builder()
        .url("ws://$ip:$port")
        .build()
    val ws = client.newWebSocket(request, WebSocketListener())
    
    // To send data:
    // ws.send(jsonString)
}
`;


export const WEBSOCKET_TEST_CONNECTION_PYTHON_EXAMPLE = `
# This code runs on the Moho Plugin (Server)
# Assumes 'websocket' is the connection object for a client

async def test_connection(websocket):
    try:
        # Send a "ping" message with a unique identifier
        ping_payload = '{"type": "ping", "id": 123}'
        await websocket.send(ping_payload)
        
        # Wait for a "pong" response for a short duration
        response = await asyncio.wait_for(websocket.recv(), timeout=2.0)
        
        # Check if the response is a valid "pong"
        data = json.loads(response)
        if data.get("type") == "pong" and data.get("id") == 123:
            print("Connection successful!")
            return True
        else:
            print("Invalid response received.")
            return False
            
    except asyncio.TimeoutError:
        print("Connection test timed out. Client did not respond.")
        return False
    except Exception as e:
        print(f"An error occurred: {e}")
        return False

# On the Android client, it should listen for "ping" and immediately send back a "pong"
# with the same ID.
`;

export const VOICE_COMMAND_KOTLIN_EXAMPLE = `
import android.content.Intent
import android.speech.RecognizerIntent
import androidx.activity.result.contract.ActivityResultContracts

val speechRecognizerLauncher = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
) { result ->
    if (result.resultCode == Activity.RESULT_OK) {
        val data = result.data
        val results = data?.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
        if (results != null && results.isNotEmpty()) {
            val spokenText = results[0].toLowerCase()
            
            if (spokenText.contains("start recording")) {
                startRecording()
            } else if (spokenText.contains("stop recording")) {
                stopRecording()
            } else {
                showToast("Lệnh không được nhận dạng.")
            }
        }
    }
}

fun startVoiceRecognition() {
    val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
    intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
    intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Nói 'Start' hoặc 'Stop'...")
    speechRecognizerLauncher.launch(intent)
}
`;

export const RELEASE_CHECKLIST_ITEMS: ReleaseChecklistItem[] = [
    { text: "Kiểm tra toàn diện kết nối WebSocket trên các mạng khác nhau (Wi-Fi, USB).", status: 'completed' },
    { text: "Tối ưu hóa hiệu suất xử lý AI trên các thiết bị Android tầm trung.", status: 'completed' },
    { text: "Đảm bảo tính tương thích với Moho Pro 12, 13, và 14.", status: 'completed' },
    { text: "Hoàn thiện tài liệu hướng dẫn sử dụng và video demo.", status: 'completed' },
    { text: "Xây dựng gói cài đặt plugin cho Windows và macOS.", status: 'completed' },
    { text: "Kiểm tra tính năng phục hồi phiên làm việc trong các trường hợp (crash, mất điện).", status: 'in-progress' },
    { text: "Thu thập phản hồi từ nhóm beta testers và sửa lỗi cuối cùng.", status: 'upcoming' },
];

const WINDOWS_INSTALLER_CODE = `
# 1. Tạo thư mục build cho installer
mkdir build_installer/windows
cd build_installer/windows

# 2. Copy plugin Lua + GUI + Python scripts vào thư mục chuẩn
cp -r ../../yolov8moho/plugin/* .

# 3. Kiểm tra phiên bản Moho đã cài trên máy
# (Windows registry hoặc file path)
python check_moho_version.py

# 4. Cài đặt thư viện Python cần thiết (requirements.txt)
pip install -r ../../yolov8moho/requirements.txt

# 5. Dùng PyInstaller để đóng gói Python backend AI thành exe
pyinstaller --onefile main.py --name Yolov8Moho

# 6. Tích hợp plugin + exe vào một trình cài đặt (Inno Setup hoặc NSIS)
# Script Inno Setup (.iss) ví dụ:
# - Copy tất cả file vào C:\\Program Files\\Yolov8Moho
# - Tạo shortcut Desktop
# - Kiểm tra Moho version trước khi cài
# - Thêm tùy chọn bật/tắt camera plugin khi cài đặt
`;

const MACOS_INSTALLER_CODE = `
# 1. Tạo thư mục build cho macOS
mkdir build_installer/macos
cd build_installer/macos

# 2. Copy plugin Lua + GUI + Python scripts
cp -r ../../yolov8moho/plugin/* .

# 3. Cài các thư viện Python cần thiết
pip3 install -r ../../yolov8moho/requirements.txt

# 4. Kiểm tra Moho.app path
python3 check_moho_version_mac.py

# 5. Dùng py2app để đóng gói Python backend AI
python3 setup.py py2app

# 6. Tạo pkg hoặc dmg sử dụng \`pkgbuild\` và \`productbuild\`
# - Tự động đặt plugin + Python scripts vào đúng thư mục
# - Đảm bảo quyền thực thi cho Lua plugin
# - Tạo shortcut mở Moho Studio Pro kèm plugin
`;

const ANDROID_BUILD_CODE = `
# 1. Dùng Android Studio, tạo project Yolov8Moho
# - Kotlin / Java frontend
# - Python backend (kết hợp Chaquopy hoặc PyTorch Mobile)
# - GUI mô phỏng timeline giả lập plugin Moho

# 2. Tích hợp model AI đã huấn luyện sẵn (YOLOv8 hoặc lựa chọn khác)
# - Chuyển sang TFLite để giảm dung lượng

# 3. Build APK
./gradlew assembleRelease

# 4. Kiểm tra tính năng:
# - Timeline giả lập
# - Camera plugin on/off
# - Keyframe mapping Lua
`;

const IOS_BUILD_CODE = `
# 1. Dùng Xcode tạo project Yolov8Moho-iOS
# - SwiftUI frontend
# - Backend AI dùng CoreML hoặc PyTorch Mobile

# 2. Chuyển model YOLOv8 sang CoreML/TFLite
# - Giữ pipeline backend tách biệt
# - Timeline giả lập + Lua mapping tương thích

# 3. Tạo build .ipa
xcodebuild -scheme Yolov8Moho-iOS -configuration Release archive

# 4. Test trên Simulator & Device
# - Timeline giả lập
# - Keyframe camera plugin
# - Camera plugin bật/tắt
`;

const DOCS_WEBSITE_CODE = `
# 1. Chọn công cụ: MkDocs hoặc Docusaurus
# mkdir docs
# cd docs

# 2. Tạo tài liệu cài đặt, Lua API, FAQ
# mkdocs new .
# mkdocs build

# 3. Thêm video tutorials vào docs:
# - Video hướng dẫn timeline giả lập
# - Cách bật/tắt camera plugin
# - Export keyframe sang Moho chính thức

# 4. Host website (Netlify / GitHub Pages)
`;

const COMMUNITY_SETUP_CODE = `
# 1. Tạo server Discord / Forum
# - Channels: support, showcase, bug-report, feature-request
# - Roles: moderator, developer, user

# 2. Tích hợp webhook từ website docs để thông báo release
# 3. Khuyến khích user chia sẻ video sample, plugin config
`;

const FINAL_QA_CHECKLIST_CODE = `
# --- KIỂM THỬ TÍNH NĂNG CỐT LÕI ---
[ ] Timeline giả lập không vượt quá 60s.
[ ] Lua layer mapping phải match chính xác tên layer trong Moho.
[ ] Bật/tắt camera plugin phải tách biệt pipeline backend AI.
[ ] Hạn chế keyframe trùng lặp khi bật lại plugin.

# --- KIỂM THỬ ĐA NỀN TẢNG ---
[ ] Windows 10/11: Installer hoạt động, plugin chạy ổn định.
[ ] macOS Ventura/Mojave: Installer hoạt động, plugin chạy ổn định.
[ ] Android 12/13: APK cài đặt và chạy đúng tính năng.
[ ] iOS 16: Build TestFlight hoạt động trên thiết bị thật.
`;


export const FINAL_SPRINT_PHASES: SprintPhase[] = [
    {
        phase: 1,
        title: "Tạo trình cài đặt Windows (.exe)",
        description: "Đóng gói toàn bộ plugin, backend AI và các tài nguyên phụ thuộc vào một trình cài đặt .exe duy nhất, giúp người dùng Windows cài đặt dễ dàng.",
        tasks: [
            {
                description: "Quy trình đóng gói bao gồm việc kiểm tra môi trường, sao chép các tệp cần thiết, đóng gói backend Python và tạo một trình cài đặt hoàn chỉnh bằng Inno Setup hoặc NSIS.",
                code: {
                    title: "Các bước build trình cài đặt Windows",
                    language: "shell",
                    code: WINDOWS_INSTALLER_CODE,
                }
            }
        ]
    },
    {
        phase: 2,
        title: "Tạo trình cài đặt macOS (.pkg / .dmg)",
        description: "Tạo một gói cài đặt .pkg hoặc .dmg thân thiện với người dùng macOS, tự động hóa việc cài đặt plugin và các dependencies vào đúng thư mục hệ thống.",
        tasks: [
            {
                description: "Sử dụng các công cụ dòng lệnh tiêu chuẩn của macOS như `py2app`, `pkgbuild`, và `productbuild` để tạo ra một trình cài đặt được ký và đáng tin cậy.",
                code: {
                    title: "Các bước build trình cài đặt macOS",
                    language: "shell",
                    code: MACOS_INSTALLER_CODE,
                }
            }
        ]
    },
    {
        phase: 3,
        title: "Build ứng dụng Android (.apk)",
        description: "Phát triển và đóng gói ứng dụng Android, tích hợp backend AI đã được tối ưu hóa (TFLite) để thu thập dữ liệu chuyển động hiệu quả trên thiết bị di động.",
        tasks: [
            {
                description: "Quy trình build sử dụng Android Studio và Gradle, tập trung vào việc tích hợp AI và đảm bảo các tính năng cốt lõi như timeline và mapping hoạt động đồng bộ với plugin trên PC.",
                code: {
                    title: "Các bước build ứng dụng Android",
                    language: "shell",
                    code: ANDROID_BUILD_CODE,
                }
            }
        ]
    },
    {
        phase: 4,
        title: "Build ứng dụng iOS (.ipa)",
        description: "Xây dựng phiên bản iOS của ứng dụng, sử dụng các công nghệ gốc như SwiftUI và CoreML để mang lại hiệu suất và trải nghiệm người dùng tốt nhất trên hệ sinh thái Apple.",
        tasks: [
            {
                description: "Quy trình yêu cầu chuyển đổi mô hình AI sang định dạng CoreML, xây dựng giao diện bằng SwiftUI, và đóng gói ứng dụng bằng Xcode để phân phối qua TestFlight hoặc App Store.",
                code: {
                    title: "Các bước build ứng dụng iOS",
                    language: "shell",
                    code: IOS_BUILD_CODE,
                }
            }
        ]
    },
    {
        phase: 5,
        title: "Tạo website tài liệu & video tutorials",
        description: "Xây dựng một trang web tài liệu trung tâm để cung cấp hướng dẫn cài đặt, tài liệu API cho LUA, câu hỏi thường gặp (FAQ), và các video hướng dẫn trực quan.",
        tasks: [
            {
                description: "Sử dụng các công cụ tạo trang tĩnh hiện đại như MkDocs hoặc Docusaurus và triển khai lên các nền tảng hosting miễn phí như GitHub Pages hoặc Netlify.",
                code: {
                    title: "Các bước tạo website tài liệu",
                    language: "shell",
                    code: DOCS_WEBSITE_CODE,
                }
            }
        ]
    },
    {
        phase: 6,
        title: "Thiết lập cộng đồng",
        description: "Xây dựng các kênh giao tiếp chính thức để hỗ trợ người dùng, thu thập phản hồi, và tạo một không gian để cộng đồng chia sẻ các tác phẩm và kinh nghiệm của họ.",
        tasks: [
            {
                description: "Tạo một server Discord và/hoặc một diễn đàn chuyên dụng với các kênh được phân chia rõ ràng cho việc hỗ trợ, báo lỗi, và yêu cầu tính năng mới.",
                code: {
                    title: "Các bước thiết lập cộng đồng",
                    language: "shell",
                    code: COMMUNITY_SETUP_CODE,
                }
            }
        ]
    },
    {
        phase: 7,
        title: "Kiểm tra cuối cùng & Hạn chế rủi ro",
        description: "Thực hiện một loạt các bài kiểm tra toàn diện trên tất cả các nền tảng để đảm bảo các tính năng cốt lõi hoạt động như mong đợi và các rủi ro tiềm ẩn đã được giải quyết.",
        tasks: [
            {
                description: "Checklist này bao gồm việc xác minh các yêu cầu kỹ thuật quan trọng và kiểm tra tính tương thích trên các hệ điều hành mục tiêu.",
                code: {
                    title: "Checklist Kiểm tra Chất lượng (QA)",
                    language: "markdown",
                    code: FINAL_QA_CHECKLIST_CODE,
                }
            }
        ]
    }
];

export const DOCUMENTATION_ARTICLES: DocumentationArticle[] = [
  {
    id: 'video-manager',
    title: 'Quản lý & Xử lý Video Đầu vào',
    icon: <VideoManagementIcon />,
    description: 'Sử dụng "Trình quản lý Video" để tải lên, quản lý và thực hiện các chỉnh sửa tiền xử lý. Tối ưu hóa video đầu vào như cắt, điều chỉnh tốc độ và độ sáng giúp AI nhận dạng chuyển động chính xác hơn, mang lại kết quả hoạt hình chất lượng cao.',
    interactiveComponent: VideoManagerUI,
  },
  {
    id: 'single-person-mode',
    title: 'Tối ưu hóa Một người',
    icon: <UserFocusIcon />,
    description: 'Một chế độ mạnh mẽ để tối ưu hóa hiệu suất và độ chính xác bằng cách chỉ thị cho AI chỉ tập trung vào một đối tượng duy nhất trong khung hình.',
    steps: [
      {
        title: 'Khi nào nên sử dụng?',
        content: 'Bật chế độ này khi bạn chỉ cần ghi lại chuyển động của một diễn viên, ngay cả khi có nhiều người khác trong cảnh quay. Đây là lựa chọn lý tưởng cho các cảnh solo hoặc khi bạn muốn cô lập một nhân vật trong đám đông. Nó cũng giúp cải thiện đáng kể FPS trên các máy tính cấu hình thấp.'
      },
      {
        title: 'Làm thế nào để kích hoạt?',
        content: 'Trong bảng "Cài đặt" của plugin, tìm tùy chọn có tên "Tối ưu hóa Một người" (Single-Person Optimization) và đánh dấu vào ô kiểm. Biểu tượng trạng thái sẽ thay đổi để xác nhận rằng chế độ này đang hoạt động.'
      },
      {
        title: 'Lưu ý Quan trọng',
        content: 'Khi chế độ này được bật, AI sẽ chỉ theo dõi người đầu tiên mà nó phát hiện được hoặc người ở gần trung tâm nhất. Mọi người khác trong khung hình sẽ bị bỏ qua hoàn toàn. Hãy đảm bảo tắt chế độ này nếu bạn cần ghi lại sự tương tác giữa nhiều nhân vật.'
      }
    ]
  }
];

export const API_CLIENT_EXAMPLE_JS = `
// API key nhận được sau khi người dùng đăng nhập thành công
const userApiKey = "generated_unique_api_key_for_user_123";

async function callGenerativeApi(promptText) {
  const API_ENDPOINT = "https://your-backend.com/api/generate-text";

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Gửi API key trong header 'Authorization'
        'Authorization': \`Bearer \${userApiKey}\`
      },
      body: JSON.stringify({ prompt: promptText })
    });

    if (!response.ok) {
      // Nếu server trả về lỗi (ví dụ: 401 Unauthorized, 429 Too Many Requests)
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    console.log("AI Response:", data);
    return data;

  } catch (error) {
    console.error("Failed to call API:", error);
  }
}
`;

export const API_SERVER_VALIDATION_PYTHON = `
from flask import Flask, request, jsonify
from functools import wraps
import time

app = Flask(__name__)

# --- CẤU HÌNH ---
# Giới hạn: 10 yêu cầu mỗi 60 giây cho mỗi người dùng
RATE_LIMIT_COUNT = 10
RATE_LIMIT_WINDOW = 60 # giây

# Giả lập database lưu trữ API keys
VALID_API_KEYS = {
    "generated_unique_api_key_for_user_123": "user123",
    "another_api_key_for_user_456": "user456",
}

# Giả lập cache/database để theo dõi số lần gọi API của người dùng
# Cấu trúc: { "user_id": [timestamp1, timestamp2, ...] }
# Trong thực tế, nên sử dụng Redis hoặc một hệ thống cache tương tự.
user_request_timestamps = {}

# Decorator để kiểm tra API key VÀ giới hạn tần suất gọi
def require_api_key_and_rate_limit(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # --- Phần 1: Xác thực API Key (giữ nguyên) ---
        api_key = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                api_key = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({"error": "Malformed Authorization header"}), 400
        
        if not api_key or api_key not in VALID_API_KEYS:
            return jsonify({"error": "Unauthorized"}), 401
        
        user_id = VALID_API_KEYS[api_key]
        request.user_id = user_id
        
        # --- Phần 2: Kiểm tra Giới hạn Tần suất (Rate Limiting) ---
        # Rate limiting là cực kỳ quan trọng để:
        # 1. Quản lý chi phí: Ngăn người dùng tạo ra quá nhiều yêu cầu tốn kém đến API của AI.
        # 2. Chống lạm dụng: Bảo vệ hệ thống khỏi các cuộc tấn công từ chối dịch vụ (DDoS) hoặc spam.
        current_time = time.time()
        
        # Lấy lịch sử timestamp của người dùng
        request_times = user_request_timestamps.get(user_id, [])
        
        # Lọc bỏ các timestamp đã cũ (nằm ngoài cửa sổ thời gian)
        recent_request_times = [t for t in request_times if current_time - t < RATE_LIMIT_WINDOW]
        
        # Kiểm tra xem số lần gọi gần đây có vượt ngưỡng không
        if len(recent_request_times) >= RATE_LIMIT_COUNT:
            return jsonify({"error": "Too Many Requests. Please try again later."}), 429
            
        # Ghi nhận timestamp của yêu cầu hiện tại
        recent_request_times.append(current_time)
        user_request_timestamps[user_id] = recent_request_times
        
        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/generate-text', methods=['POST'])
@require_api_key_and_rate_limit # Sử dụng decorator mới
def generate_text():
    user_id = request.user_id 
    print(f"API call from authenticated user: {user_id}")
    # ... (Logic gọi đến Gemini Nano/Gemma) ...
    return jsonify({"response": "This is a generated text."})

if __name__ == '__main__':
    app.run(debug=True)
`;

// New constants for Hybrid AI Architecture
export const SOCKET_IO_SERVER_CODE = `
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for pose data from client
    socket.on('poseData', (data) => {
        console.log('Received pose data:', data);
        
        // Analyze AI and send result back
        const result = analyzePose(data); // Placeholder for AI analysis
        socket.emit('poseResult', result); // Send result to client
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// Example analysis function
function analyzePose(data) {
    // Real AI analysis would happen here
    return { status: 'success', message: 'Pose analysis completed' };
}
`;

export const LOCAL_AI_FALLBACK_CODE = `
function checkWebSocketConnection() {
    // Check WebSocket connection status
    if (!webSocketConnected) {
        // Switch to fallback mode if disconnected
        runLocalAiAnalysis();
    } else {
        // If connected, continue using the WebSocket server
        startWebSocketAnalysis();
    }
}

function runLocalAiAnalysis() {
    // Use local AI model (lightweight or full-size) for analysis
    loadModel(userSelectedModelType).then((model) => {
        const result = model.analyze(localVideoData);
        displayResult(result);
    });
}
`;

export const MODEL_SELECTION_CODE = `
const modelType = userSelectedModelType; // 'lightweight' or 'full-size'

function loadModel(type) {
    if (type === 'lightweight') {
        // Load the lightweight model (TFLite/ONNX)
        return loadLightweightModel();
    } else {
        // Load the full-size AI model
        return loadFullSizeModel();
    }
}

function loadLightweightModel() {
    // Logic to load the optimized TFLite or ONNX model
}

function loadFullSizeModel() {
    // Logic to load the standard, high-accuracy model
}
`;