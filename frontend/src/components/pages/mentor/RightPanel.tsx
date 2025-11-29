import React from 'react';

export type MentorSettings = {
  homework?: boolean;
  tests?: boolean;
  showTeachLike?: boolean;
  teachLike?: string;
  showDifficulty?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
};

type Props = {
  settings?: MentorSettings | null;
};

const RightPanel: React.FC<Props> = ({ settings }) => {
  // fallback when no settings provided
  if (!settings) {
    return (
      <aside className="mentor-right" style={{ padding: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Overview</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button className="btn">Overview</button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="mentor-right" style={{ padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Actions</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Overview always */}
        <button className="btn">Overview</button>

        {/* Conditional buttons based on settings */}
        {settings.homework && <button className="btn">Homework</button>}
        {settings.tests && <button className="btn">Tests</button>}
        {settings.showTeachLike && (
          <button className="btn">Teach like: {settings.teachLike || 'custom'}</button>
        )}
        {settings.showDifficulty && (
          <button className="btn">Difficulty: {settings.difficulty || 'medium'}</button>
        )}
      </div>
    </aside>
  );
};

export default RightPanel;