import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import scenesData from "../../../videos/darwin/scenes.json";
import { BigNumberScene } from "./BigNumberScene";
import { ComparisonScene } from "./ComparisonScene";
import { StepListScene } from "./StepListScene";
import { PaperCaption } from "./PaperCaption";

export const PaperVideo: React.FC = () => {
  const { scenes } = scenesData;
  const s1 = scenes[0];
  const s2 = scenes[1];
  const s3 = scenes[2];
  const s4 = scenes[3];
  const s5 = scenes[4];

  return (
    <AbsoluteFill style={{ backgroundColor: "#FAF8F5", overflow: "hidden" }}>
      {/* Giọng đọc voice.wav */}
      <Audio src={staticFile("videos/darwin/voice.wav")} />

      {/* Cảnh 1: Con số lớn 22 tuổi */}
      <Sequence from={s1.from} durationInFrames={s1.to - s1.from}>
        <BigNumberScene
          tag="Khởi đầu bất ngờ · 1831"
          title="Bạn có biết? *22 tuổi* Charles Darwin lên tàu Beagle"
          number="22"
          unit="Tuổi"
          description="Chỉ để làm bạn trò chuyện cho thuyền trưởng Robert FitzRoy trong hải trình khảo sát."
          detail="Một chuyến đi tình cờ đã đưa chàng cử nhân thần học trẻ tuổi bước vào lịch sử khoa học."
        />
      </Sequence>

      {/* Cảnh 2: So sánh hai bên (2 năm vs gần 5 năm) */}
      <Sequence from={s2.from} durationInFrames={s2.to - s2.from}>
        <ComparisonScene
          tag="Thời gian hải trình"
          title="Chuyến khảo sát *kéo dài gấp đôi* dự tính"
          subtitle="Kế hoạch ban đầu của Hải quân Anh so với thực tế chuyến đi biển:"
          left={{
            tag: "Dự kiến ban đầu",
            value: "2",
            unit: "Năm",
            desc: "Kế hoạch khảo sát thủy văn Nam Mỹ do Đô đốc Hải quân Anh phê duyệt.",
          }}
          right={{
            tag: "Thực tế chuyến đi",
            value: "~5",
            unit: "Năm",
            desc: "Kéo dài tới gần 5 năm trời lênh đênh qua các đại dương trên thế giới.",
            highlight: true,
          }}
          verdict="Một hải trình gian nan ngoài dự kiến nhưng lại tạo nên kho tư liệu sinh học vô giá."
        />
      </Sequence>

      {/* Cảnh 3: Con số lớn (3.3 năm trên đất liền) */}
      <Sequence from={s3.from} durationInFrames={s3.to - s3.from}>
        <BigNumberScene
          tag="Thử thách & Nghiên cứu"
          title="Dù mang tiếng đi biển, nhưng lại *say sóng triền miên*"
          number="3.3"
          unit="Năm trên đất liền"
          description="Dành hẳn 3 năm 3 tháng trên đất liền để thu thập hóa thạch và khảo sát thiên nhiên Nam Mỹ."
          detail="Mỗi khi tàu cập cảng, Darwin lập tức lên bờ rong ruổi hàng nghìn dặm để thoát khỏi say sóng."
        />
      </Sequence>

      {/* Cảnh 4: Danh sách các bước (Galapagos & Chim sẻ) */}
      <Sequence from={s4.from} durationInFrames={s4.to - s4.from}>
        <StepListScene
          tag="Bước ngoặt lịch sử"
          title="Chỉ *5 tuần* ngắn ngủi làm thay đổi tất cả"
          subtitle="Quần đảo núi lửa Galapagos đã mở ra cánh cửa cho học thuyết tiến hóa:"
          steps={[
            {
              number: 1,
              label: "5 tuần khảo sát tại quần đảo Galapagos",
              detail: "Quan sát hệ sinh thái hoang sơ cô lập giữa Thái Bình Dương.",
            },
            {
              number: 2,
              label: "Thu thập mẫu chim sẻ & hóa thạch cổ",
              detail: "Ghi nhận sự khác biệt hình thái mỏ chim thích nghi theo từng hòn đảo.",
            },
            {
              number: 3,
              label: "Thay đổi hoàn toàn suy nghĩ về loài",
              detail: "Hạt mầm đầu tiên hình thành thuyết chọn lọc tự nhiên chấn động thế giới.",
              highlight: true,
            },
          ]}
        />
      </Sequence>

      {/* Cảnh 5: So sánh hai bên (Câu hỏi giả định lịch sử) */}
      <Sequence from={s5.from} durationInFrames={s5.to - s5.from}>
        <ComparisonScene
          tag="Câu hỏi gợi mở"
          title="Nếu năm đó Darwin *từ chối* con tàu này?"
          subtitle="Một quyết định tuổi 22 đã định hình cả nền khoa học thế giới:"
          left={{
            tag: "Quyết định năm 1831",
            value: "1859",
            unit: "Nguồn gốc các loài",
            desc: "Thuyết tiến hóa ra đời, mở ra kỷ nguyên mới cho toàn bộ sinh học hiện đại.",
          }}
          right={{
            tag: "Nếu từ chối",
            value: "+??",
            unit: "Thập kỷ",
            desc: "Liệu thuyết tiến hóa có ra đời muộn hơn hàng thập kỷ?",
            highlight: true,
          }}
          verdict="Một lời nhận lời bước lên con tàu nhỏ đã vĩnh viễn thay đổi nhận thức của nhân loại."
        />
      </Sequence>

      {/* Caption phong cách Paper: cực kỳ thanh thoát, chữ Inter, màu nhấn cam đất */}
      <PaperCaption />
    </AbsoluteFill>
  );
};
