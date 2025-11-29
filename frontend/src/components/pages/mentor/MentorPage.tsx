import React, { useState } from 'react';
import LeftList from './LeftList';
import RightPanel from './RightPanel';
import type { MentorSettings } from './RightPanel';

type Props = {
    items: string[]; // list of mentor names for left column
    initialSettings?: MentorSettings | null;
};

const MentorPage: React.FC<Props> = ({ items, initialSettings = null }) => {
    const [selected, setSelected] = useState<string | undefined>(items[0]);
    const [settings] = useState<MentorSettings | null>(initialSettings); // can be updated later

    return (
        <div
            className="mentor-page"
            style={{
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                padding: 16,
            }}
        >
            {/* Left column */}
            <div style={{ flex: '0 0 220px' }}>
                <LeftList items={items} selected={selected} onSelect={(n) => setSelected(n)} />
            </div>

            {/* Middle column - Overview */}
            <main
                style={{
                    flex: '1 1 480px',
                    background: 'transparent',
                    padding: 12,
                    borderRadius: 8,
                }}
            >
                <h3 style={{ marginTop: 0 }}>{selected ?? 'Select a mentor'}</h3>
                <div style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <strong>Course / Overview</strong>
                    <p style={{ marginTop: 8 }}>
                        This is a placeholder overview for <em>{selected}</em>. When connected to
                        backend, course title, description and details will appear here. For now
                        this is static text to show layout.
                    </p>
                    <p>
                        You can expand this section with syllabus, sessions, or any other
                        information related to the selected mentor or course.
                    </p>
                </div>
            </main>

            {/* Right column */}
            <div style={{ flex: '0 0 220px' }}>
                <RightPanel settings={settings} />
            </div>
        </div>
    );
};

export default MentorPage;
