import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage} from './Stage';
import {settle, travel} from './motion';

export const SheetScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Story Act 1: Grid appears (local frames 76 - 100)
  const gridEntry = settle(frame, 77, fps, 24);

  // Story Act 2: Manual typing & cell selection shift (local frames 104 - 135)
  const typingProg1 = Math.min(1, Math.max(0, (frame - 102) / 18));
  const cellShift = travel(frame, 122, 134);
  const typingProg2 = Math.min(1, Math.max(0, (frame - 134) / 16));

  // Story Act 3: Clock spinning & stat counter in corner (local frames 124 - 160)
  const timerEntry = settle(frame, 126, fps, 24);
  const clockSpin = travel(frame, 124, 160) * 720;
  const timeCounterPop = settle(frame, 142, fps, 20);

  const text1 = 'Khách A';
  const text2 = 'Đang chờ';
  const displayed1 = text1.slice(0, Math.floor(typingProg1 * text1.length));
  const displayed2 = text2.slice(0, Math.floor(typingProg2 * text2.length));

  return (
    <Stage index={1} title="Google Sheet">
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 480,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Hero: Large Centered Spreadsheet Window (840px wide, rich multi-row editorial UI) */}
        <div
          style={{
            position: 'relative',
            width: 840,
            background: '#FFFFFF',
            borderRadius: 24,
            border: '2px solid #E2E8F0',
            boxShadow: '0 24px 56px rgba(15, 23, 42, 0.09), 0 4px 16px rgba(15, 23, 42, 0.04)',
            overflow: 'visible',
            opacity: gridEntry,
            transform: `scale(${0.94 + gridEntry * 0.06})`,
          }}
        >
          {/* Sheet Window Top Toolbar with Official Google Sheet Icon */}
          <div
            style={{
              height: 54,
              background: '#F8FAFC',
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              borderBottom: '2px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Img
                src={staticFile('icon/googlesheet.png')}
                style={{width: '100%', height: '100%', objectFit: 'contain'}}
              />
            </div>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#1E293B',
                letterSpacing: '-0.3px',
              }}
            >
              CRM_Khách_Hàng.xlsx
            </span>
            <div style={{marginLeft: 'auto', display: 'flex', gap: 7}}>
              {[0, 1, 2].map((k) => (
                <div key={k} style={{width: 9, height: 9, borderRadius: '50%', background: '#CBD5E1'}} />
              ))}
            </div>
          </div>

          {/* Table Grid (840px total = 320px + 280px + 240px) */}
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '320px 280px 240px',
              borderBottomLeftRadius: 22,
              borderBottomRightRadius: 22,
              overflow: 'hidden',
            }}
          >
            {/* Column Headers */}
            <div
              style={{
                height: 46,
                background: '#F1F5F9',
                borderBottom: '2px solid #E2E8F0',
                borderRight: '1.5px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
                fontSize: 14,
                fontWeight: 700,
                color: '#64748B',
                letterSpacing: '0.2px',
              }}
            >
              Khách hàng
            </div>
            <div
              style={{
                height: 46,
                background: '#F1F5F9',
                borderBottom: '2px solid #E2E8F0',
                borderRight: '1.5px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
                fontSize: 14,
                fontWeight: 700,
                color: '#64748B',
                letterSpacing: '0.2px',
              }}
            >
              Trạng thái
            </div>
            <div
              style={{
                height: 46,
                background: '#F1F5F9',
                borderBottom: '2px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
                fontSize: 14,
                fontWeight: 700,
                color: '#64748B',
                letterSpacing: '0.2px',
              }}
            >
              Thời gian
            </div>

            {/* Row 1 (Ready data: Khách VIP 01) */}
            <div
              style={{
                height: 60,
                borderBottom: '1px solid #F1F5F9',
                borderRight: '1.5px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
                fontSize: 16,
                fontWeight: 700,
                color: '#1E293B',
              }}
            >
              Khách VIP 01
            </div>
            <div
              style={{
                height: 60,
                borderBottom: '1px solid #F1F5F9',
                borderRight: '1.5px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
              }}
            >
              <span
                style={{
                  padding: '5px 14px',
                  borderRadius: 10,
                  background: '#DCFCE7',
                  color: '#15803D',
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                ✓ Đã chốt
              </span>
            </div>
            <div
              style={{
                height: 60,
                borderBottom: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
                fontSize: 15,
                fontWeight: 600,
                color: '#94A3B8',
              }}
            >
              09:15
            </div>

            {/* Row 2 (Ready data: Khách VIP 02) */}
            <div
              style={{
                height: 60,
                borderBottom: '1px solid #F1F5F9',
                borderRight: '1.5px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
                fontSize: 16,
                fontWeight: 700,
                color: '#1E293B',
              }}
            >
              Khách VIP 02
            </div>
            <div
              style={{
                height: 60,
                borderBottom: '1px solid #F1F5F9',
                borderRight: '1.5px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
              }}
            >
              <span
                style={{
                  padding: '5px 14px',
                  borderRadius: 10,
                  background: '#E0F2FE',
                  color: '#0369A1',
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                Đang xử lý
              </span>
            </div>
            <div
              style={{
                height: 60,
                borderBottom: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
                fontSize: 15,
                fontWeight: 600,
                color: '#94A3B8',
              }}
            >
              10:30
            </div>

            {/* Row 3 (Manual Typing in Action: Khách A -> Đang chờ) */}
            <div
              style={{
                height: 64,
                borderBottom: '1px solid #F1F5F9',
                borderRight: '1.5px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
                fontSize: 17,
                fontWeight: 800,
                color: '#1E293B',
              }}
            >
              {displayed1}
              {cellShift < 0.5 && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 2.5,
                    height: 22,
                    background: '#0F9D58',
                    marginLeft: 3,
                    opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0,
                  }}
                />
              )}
            </div>
            <div
              style={{
                height: 64,
                borderBottom: '1px solid #F1F5F9',
                borderRight: '1.5px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
              }}
            >
              {displayed2.length > 0 && (
                <span
                  style={{
                    padding: '5px 14px',
                    borderRadius: 10,
                    background: '#FEF3C7',
                    color: '#B45309',
                    fontSize: 14,
                    fontWeight: 800,
                  }}
                >
                  {displayed2}
                </span>
              )}
              {cellShift >= 0.5 && frame < 155 && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 2.5,
                    height: 22,
                    background: '#0F9D58',
                    marginLeft: 4,
                    opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0,
                  }}
                />
              )}
            </div>
            <div
              style={{
                height: 64,
                borderBottom: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 22,
                fontSize: 18,
                color: '#CBD5E1',
              }}
            >
              ...
            </div>

            {/* Row 4 (Empty spreadsheet continuation line) */}
            <div style={{height: 48, borderRight: '1.5px solid #F8FAFC'}} />
            <div style={{height: 48, borderRight: '1.5px solid #F8FAFC'}} />
            <div style={{height: 48}} />

            {/* Active Cell Focus Outline */}
            <div
              style={{
                position: 'absolute',
                top: 46 + 60 + 60,
                left: cellShift * 320,
                width: cellShift < 0.5 ? 320 : 280,
                height: 64,
                border: '3px solid #0F9D58',
                boxSizing: 'border-box',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  width: 8,
                  height: 8,
                  background: '#0F9D58',
                }}
              />
            </div>
          </div>

          {/* Compact Corner Badge: Floating Stopwatch + "+3h / ngày" */}
          {timerEntry > 0 && (
            <div
              style={{
                position: 'absolute',
                top: -20,
                right: 20,
                background: '#FFFFFF',
                borderRadius: 20,
                border: '2px solid #FB923C',
                boxShadow: '0 12px 28px rgba(249, 115, 22, 0.22)',
                padding: '8px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: timerEntry,
                transform: `translateY(${(1 - timerEntry) * 16}px) scale(${0.9 + timerEntry * 0.1})`,
                zIndex: 40,
              }}
            >
              {/* Spinning mini stopwatch needle */}
              <div
                style={{
                  position: 'relative',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#FFF7ED',
                  border: '2px solid #F97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: 2.5,
                    height: 12,
                    background: '#EA580C',
                    borderRadius: 2,
                    top: 6,
                    transformOrigin: 'bottom center',
                    transform: `rotate(${clockSpin}deg)`,
                  }}
                />
                <div style={{width: 6, height: 6, borderRadius: '50%', background: '#EA580C', zIndex: 2}} />
              </div>

              {/* Metric count */}
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: '#EA580C',
                  letterSpacing: '-0.3px',
                  whiteSpace: 'nowrap',
                  opacity: timeCounterPop,
                  transform: `scale(${0.85 + timeCounterPop * 0.15})`,
                }}
              >
                +3h / ngày
              </div>
            </div>
          )}
        </div>
      </div>
    </Stage>
  );
};
