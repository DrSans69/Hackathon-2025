import React from 'react';

type Props = {
  items: string[];
  selected?: string;
  onSelect?: (name: string) => void;
};

const LeftList: React.FC<Props> = ({ items, selected, onSelect }) => {
  return (
    <aside className="mentor-left" style={{ padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Mentors</div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((it) => (
          <li key={it} style={{ marginBottom: 6 }}>
            <button
              type="button"
              onClick={() => onSelect?.(it)}
              className={`mentor-left__item ${selected === it ? 'is-active' : ''}`}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 10px',
                borderRadius: 8,
                background: selected === it ? 'rgba(255,255,255,0.06)' : 'transparent',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              {it}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default LeftList;