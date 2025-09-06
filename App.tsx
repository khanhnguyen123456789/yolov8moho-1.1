
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { IconCard } from './components/IconCard';
import { RoadmapStep } from './components/RoadmapStep';
import { FeatureTabs } from './components/FeatureTabs';
import { CodeBlock } from './components/CodeBlock';
import { Modal } from './components/Modal';
import { TechStackItem } from './types';
import { ReleaseChecklist } from './components/ReleaseChecklist';
import { FinalSprintRoadmap } from './components/FinalSprintRoadmap';
import { DocumentationSection } from './components/DocumentationSection';
import { UserApiManagementDiagram } from './components/UserApiManagementDiagram';
import { Settings } from './components/Settings';
import { TrackingFeatures } from './components/TrackingFeatures';
import { HybridAiArchitecture } from './components/HybridAiArchitecture';
import { DeploymentOrder } from './components/DeploymentOrder';
import { CameraPluginDirective } from './components/CameraPluginDirective';
import {
  TECH_STACK_PROGRAMMING,
  TECH_STACK_AI,
  TECH_STACK_TOOLS,
  ANDROID_FEATURES,
  MOHO_PLUGIN_FEATURES,
  ROADMAP_PHASES,
  HARDWARE_ANDROID,
  HARDWARE_PC,
  POSE_DATA_JSON_EXAMPLE,
  PROJECT_GOALS,
  ECOSYSTEM_COMPONENTS,
  WEBSOCKET_CLIENT_KOTLIN_EXAMPLE,
  WEBSOCKET_SERVER_PYTHON_EXAMPLE,
  WEBSOCKET_TEST_CONNECTION_PYTHON_EXAMPLE,
  VOICE_COMMAND_KOTLIN_EXAMPLE,
  QR_CODE_SERVER_PYTHON_EXAMPLE,
  QR_CODE_SCANNER_KOTLIN_EXAMPLE,
  KEYFRAME_FILTERING_LOGIC_PSEUDOCODE,
  RELEASE_CHECKLIST_ITEMS,
  FINAL_SPRINT_PHASES,
  DOCUMENTATION_ARTICLES,
  API_CLIENT_EXAMPLE_JS,
  API_SERVER_VALIDATION_PYTHON,
} from './constants';

interface ProjectStatusProps {
  percentage: number;
  statusText: string;
}

const ProjectStatus: React.FC<ProjectStatusProps> = ({ percentage, statusText }) => {
  return (
    <div className="panel p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-orbitron text-xl font-bold text-teal-400">Trạng thái dự án</h3>
        <span className="text-2xl font-bold text-white">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-teal-500 to-sky-500 h-2.5 rounded-full transition-all duration-500 ease-out relative shadow-[0_0_8px] shadow-teal-500/80" 
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 progress-bar-shimmer"></div>
        </div>
      </div>
      <p className="text-right text-gray-400 mt-2 text-sm">{statusText}</p>
    </div>
  );
};


const App: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechStackItem | null>(null);

  const handleTechCardClick = (tech: TechStackItem) => {
    setSelectedTech(tech);
  };

  const closeModal = () => {
    setSelectedTech(null);
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />

        <Section title="Tổng Quan Hiện Tại">
          <ProjectStatus 
            percentage={100} 
            statusText="Phiên bản 1.0 đã phát hành! Bắt đầu giai đoạn phát triển nước rút cuối cùng." 
          />
        </Section>
        
        <Section title="Lệnh Triển Khai Dự Án">
          <DeploymentOrder />
        </Section>

        <Section title="Chỉ thị Kỹ thuật: Xung đột Camera Plugin">
          <CameraPluginDirective />
        </Section>
        
        <Section title="Giai Đoạn Phát Triển Nước Rút (Final Sprint)">
          <FinalSprintRoadmap phases={FINAL_SPRINT_PHASES} />
        </Section>

        <Section title="Mục Tiêu Cốt Lõi">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECT_GOALS.map((goal, index) => (
              <div key={index} className="panel p-6">
                <h3 className="font-orbitron text-xl font-bold text-teal-400 mb-2">{goal.title}</h3>
                <p className="text-gray-400">{goal.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Hệ Sinh Thái Yolov8Moho">
           <div className="panel flex flex-col md:flex-row items-center justify-center gap-8 p-6">
              {ECOSYSTEM_COMPONENTS.map((component, index) => (
                <React.Fragment key={index}>
                    <div className="text-center max-w-sm">
                        {component.icon}
                        <h3 className="text-2xl font-bold mt-4 mb-2 text-white font-orbitron">{component.title}</h3>
                        <p className="text-gray-400">{component.description}</p>
                    </div>
                    {index < ECOSYSTEM_COMPONENTS.length - 1 && (
                      <div className="text-teal-400 transform md:rotate-0 rotate-90 text-glow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    )}
                </React.Fragment>
              ))}
          </div>
        </Section>
        
        <Section title="Phân Tích Chi Tiết Các Tính Năng">
          <FeatureTabs androidFeatures={ANDROID_FEATURES} mohoPluginFeatures={MOHO_PLUGIN_FEATURES} />
        </Section>

        <Section title="Kiến trúc Xử lý AI Hybrid">
            <HybridAiArchitecture />
        </Section>

        <Section title="Tính Năng Theo Dõi Nâng Cao">
          <TrackingFeatures />
        </Section>

        <Section title="Hướng Dẫn & Tối Ưu Hóa">
            <DocumentationSection articles={DOCUMENTATION_ARTICLES} />
        </Section>

        <Section title="Thuật Toán Lọc Keyframe Nâng Cao">
            <p className="mb-8 text-gray-400 leading-relaxed max-w-4xl">
                Để đảm bảo chỉ những chuyển động thực sự có ý nghĩa được ghi lại, thuật toán lọc keyframe sẽ sử dụng đồng thời nhiều tiêu chí. Nó không chỉ dựa vào vận tốc của các điểm khớp mà còn phân tích sự thay đổi góc của các khớp chính (như khuỷu tay, đầu gối) và so sánh sự khác biệt tổng thể của toàn bộ tư thế so với keyframe cuối cùng. Cách tiếp cận này giúp nắm bắt được cả những chuyển động tinh tế và những thay đổi tư thế quan trọng.
            </p>
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Ví dụ Logic Lọc Keyframe (Pseudocode)</h3>
                <CodeBlock code={KEYFRAME_FILTERING_LOGIC_PSEUDOCODE} language="python" />
            </div>
        </Section>

        <Section title="Yêu Cầu Kỹ Thuật và Tài Nguyên">
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white border-l-4 border-teal-400 pl-4 font-orbitron">Công Nghệ Sử Dụng</h3>
              <h4 className="text-xl font-semibold text-gray-400 mt-6 mb-4">Ngôn ngữ & Giao diện</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TECH_STACK_PROGRAMMING.map(item => <IconCard key={item.name} {...item} onClick={handleTechCardClick} />)}
              </div>
              <h4 className="text-xl font-semibold text-gray-400 mt-6 mb-4">AI & Xử lý ảnh</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TECH_STACK_AI.map(item => <IconCard key={item.name} {...item} onClick={handleTechCardClick} />)}
              </div>
               <h4 className="text-xl font-semibold text-gray-400 mt-6 mb-4">Môi trường & Công cụ</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {TECH_STACK_TOOLS.map(item => <IconCard key={item.name} {...item} onClick={handleTechCardClick} />)}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white border-l-4 border-teal-400 pl-4 font-orbitron">Cấu Hình Phần Cứng Tối Thiểu</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="panel p-6">
                  <h4 className="text-xl font-bold text-teal-400 mb-4 font-orbitron">Thiết bị Android</h4>
                  <ul className="space-y-2 text-gray-400">
                    {HARDWARE_ANDROID.map((item, i) => <li key={i}><span className="font-semibold text-gray-300">{item.spec}:</span> {item.value}</li>)}
                  </ul>
                </div>
                <div className="panel p-6">
                  <h4 className="text-xl font-bold text-teal-400 mb-4 font-orbitron">PC</h4>
                   <ul className="space-y-2 text-gray-400">
                    {HARDWARE_PC.map((item, i) => <li key={i}><span className="font-semibold text-gray-300">{item.spec}:</span> {item.value}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Cài Đặt & Tùy Chỉnh">
          <Settings />
        </Section>

        <Section title="Kiến trúc Quản lý Người dùng & API Key">
            <p className="mb-8 text-gray-400 leading-relaxed max-w-4xl">
                Để hỗ trợ nhiều người dùng một cách an toàn và có tổ chức, hệ thống cần một backend chuyên dụng để quản lý tài khoản và API key. Mỗi người dùng sẽ có một API key duy nhất, đảm bảo rằng mọi yêu cầu đến các dịch vụ AI đều được xác thực và phân quyền chính xác. Kiến trúc này ngăn chặn việc lạm dụng tài nguyên và cho phép theo dõi, giới hạn việc sử dụng API cho từng tài khoản.
            </p>
            <div className="panel p-6">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Sơ đồ Luồng Xác thực và Gọi API</h3>
                <UserApiManagementDiagram />
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Phía Client: Gửi Yêu cầu với API Key (JavaScript)</h3>
                <CodeBlock code={API_CLIENT_EXAMPLE_JS} language="javascript" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Phía Server: Xác thực API Key (Python/Flask)</h3>
                <CodeBlock code={API_SERVER_VALIDATION_PYTHON} language="python" />
              </div>
            </div>
        </Section>

        <Section title="Quản Lý Kết Nối & Mã QR">
          <p className="mb-8 text-gray-400 leading-relaxed max-w-4xl">
            Quy trình kết nối được thiết kế để liền mạch và không tốn sức. Khi người dùng khởi động server trên plugin Moho, một mã QR sẽ ngay lập tức được tạo và hiển thị trong giao diện. Mã này chứa địa chỉ IP cục bộ và cổng kết nối của máy tính. Dữ liệu được mã hóa dưới dạng một chuỗi văn bản đơn giản theo định dạng <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">IP_ADDRESS:PORT</code> (ví dụ: <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">192.168.1.100:8765</code>), sau đó ứng dụng Android sẽ phân tích chuỗi này để trích xuất địa chỉ IP cần thiết cho việc kết nối. Trên ứng dụng Android, người dùng chỉ cần nhấn vào nút 'Kết nối bằng QR', camera sẽ được kích hoạt. Chỉ cần hướng camera vào mã QR trên màn hình PC, kết nối sẽ được thiết lập gần như ngay tức thì. Hệ thống 'quét và kết nối' này loại bỏ hoàn toàn nhu cầu tìm kiếm và nhập địa chỉ IP phức tạp, giúp tránh sai sót và biến một công đoạn kỹ thuật thành một trải nghiệm mượt mà, trực quan và chuyên nghiệp.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Plugin Moho: Tạo và Hiển thị Mã QR (Python)</h3>
              <CodeBlock code={QR_CODE_SERVER_PYTHON_EXAMPLE} language="python" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Ứng dụng Android: Quét Mã QR (Kotlin)</h3>
              <CodeBlock code={QR_CODE_SCANNER_KOTLIN_EXAMPLE} language="kotlin" />
            </div>
          </div>
        </Section>

        <Section title="Giao Tiếp Mạng: WebSocket">
          <p className="mb-8 text-gray-400 leading-relaxed max-w-4xl">
            Để truyền dữ liệu tư thế từ ứng dụng Android đến plugin Moho trong thời gian thực, chúng ta sẽ sử dụng WebSocket. Plugin Moho sẽ chạy một server WebSocket, lắng nghe kết nối. Ứng dụng Android sẽ hoạt động như một client, kết nối đến server và gửi dữ liệu keypoint dưới dạng JSON sau mỗi lần xử lý.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Phía Plugin Moho (Server - Python)</h3>
              <CodeBlock code={WEBSOCKET_SERVER_PYTHON_EXAMPLE} language="python" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Phía Ứng dụng (Client - Kotlin)</h3>
              <CodeBlock code={WEBSOCKET_CLIENT_KOTLIN_EXAMPLE} language="kotlin" />
            </div>
          </div>
        </Section>
        
        <Section title="Kiểm Tra Kết Nối Chủ Động">
            <p className="mb-8 text-gray-400 leading-relaxed max-w-4xl">
                Để giúp người dùng dễ dàng chẩn đoán các sự cố kết nối, plugin Moho sẽ được trang bị nút "Kiểm tra Kết nối". Khi được nhấn, plugin sẽ không chờ đợi dữ liệu từ client mà sẽ chủ động gửi một gói tin "ping" tới địa chỉ IP đã được lưu từ lần kết nối thành công cuối cùng. Ứng dụng Android sẽ được lập trình để tự động phản hồi bằng một gói tin "pong". Nếu nhận được phản hồi trong một khoảng thời gian ngắn, giao diện sẽ hiển thị thông báo "Kết nối thành công!". Ngược lại, nếu kết nối thất bại, hết thời gian chờ, hoặc bị từ chối, một thông báo lỗi cụ thể sẽ được hiển thị. Tính năng này cho phép người dùng xác định nhanh chóng liệu vấn đề nằm ở kết nối mạng, tường lửa, hay do ứng dụng Android chưa sẵn sàng, mà không cần phải thực hiện lại toàn bộ quy trình quét mã QR.
            </p>
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Plugin Moho: Logic Nút "Kiểm tra Kết nối" (Python)</h3>
                <CodeBlock code={WEBSOCKET_TEST_CONNECTION_PYTHON_EXAMPLE} language="python" />
            </div>
        </Section>

        <Section title="Điều Khiển Bằng Giọng Nói">
          <p className="mb-8 text-gray-400 leading-relaxed max-w-4xl">
            Để giải phóng hoàn toàn đôi tay cho animator, ứng dụng Android sẽ tích hợp tính năng nhận dạng giọng nói. Người dùng có thể bắt đầu và dừng quá trình ghi hình bằng các khẩu lệnh đơn giản. Hệ thống được thiết kế để xử lý lỗi một cách thông minh, cung cấp phản hồi rõ ràng cho người dùng nếu khẩu lệnh không được nhận dạng, hoặc có sự cố với microphone, đảm bảo trải nghiệm người dùng luôn mượt mà và dễ hiểu.
          </p>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Ví dụ triển khai trên Android (Kotlin)</h3>
            <CodeBlock code={VOICE_COMMAND_KOTLIN_EXAMPLE} language="kotlin" />
          </div>
        </Section>


        <Section title="Định Dạng Dữ Liệu & Code Mẫu">
          <p className="mb-4 text-gray-400 leading-relaxed max-w-4xl">
            Dữ liệu keypoint từ ứng dụng Android sẽ được gửi dưới dạng chuỗi JSON có cấu trúc rõ ràng, đảm bảo tính nhất quán và khả năng mở rộng. Cấu trúc này bao gồm một <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">timestamp</code> để đồng bộ hóa, một <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">frame_id</code> cho mỗi khung hình, và một mảng <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">poses</code> có thể lưu dữ liệu cho nhiều người. Mỗi đối tượng trong mảng <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">poses</code> đại diện cho một người, bao gồm một <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">person_id</code> duy nhất và một danh sách các <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">keypoints</code>. Mỗi đối tượng keypoint cung cấp <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">name</code> (tên) của khớp (ví dụ: 'nose', 'left_shoulder'), tọa độ <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">x</code> và <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">y</code> của nó trên khung hình, và một điểm <code className="bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded-md font-mono">confidence</code> (độ tin cậy) cho biết mức độ chắc chắn của AI về vị trí của điểm đó.
          </p>
          <CodeBlock code={POSE_DATA_JSON_EXAMPLE} language="json" />
        </Section>
        
        <Section title="Chuẩn Bị Phát Hành">
            <ReleaseChecklist items={RELEASE_CHECKLIST_ITEMS} />
        </Section>

        <Section title="Lộ Trình Phát Triển (Đã Hoàn Thành)">
          <div className="relative border-l-2 border-gray-700/50 ml-6">
            <div className="space-y-12">
              {ROADMAP_PHASES.map(phase => <RoadmapStep key={phase.phase} {...phase} />)}
            </div>
          </div>
        </Section>

        <Section title="Kết Luận và Tác Động">
          <div className="panel p-6 border border-teal-500/30">
            <p className="text-lg text-gray-300 leading-relaxed">
              Yolov8Moho không chỉ là một công cụ, mà là một giải pháp toàn diện được xây dựng dựa trên sự thấu hiểu sâu sắc quy trình làm việc của nhà làm phim hoạt hình 2D. Bằng cách kết hợp sức mạnh của AI với khả năng kiểm soát nghệ thuật, dự án sẽ tiết kiệm hàng trăm giờ lao động, nâng cao chất lượng nghệ thuật, và tạo ra một tiêu chuẩn mới cho ngành hoạt hình 2D.
            </p>
          </div>
        </Section>
        
        <footer className="text-center mt-16 text-gray-500">
          <p className="font-orbitron">Yolov8Moho Project Plan & Dashboard</p>
          <p>Một công cụ không thể thiếu trong kho vũ khí của các nhà làm phim hoạt hình chuyên nghiệp.</p>
        </footer>
      </main>

      {selectedTech && (
        <Modal 
            isOpen={!!selectedTech} 
            onClose={closeModal} 
            title={selectedTech.name}
            icon={selectedTech.icon}
        >
            <p className="text-base leading-relaxed text-gray-400">
                {selectedTech.description}
            </p>
        </Modal>
      )}
    </div>
  );
};

export default App;
