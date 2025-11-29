import { useState } from 'react';
import Mentor from './MentorCard';
import SetMentor from '../mentor/SetMentor';
import MentorPage from '../mentor/MentorPage';

const Main = () => {
    const [showSetMentor, setShowSetMentor] = useState(false);
    const [showMentorPage, setShowMentorPage] = useState(false);

    return (
        <main className="main">
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <button className="main__add-btn" onClick={() => setShowSetMentor(true)}>
                    Add Mentor
                </button>

                <button
                    className="main__add-btn"
                    onClick={() => setShowMentorPage((s) => !s)}
                    aria-pressed={showMentorPage}
                >
                    {showMentorPage ? 'Close Mentor Page' : 'Open Mentor Page'}
                </button>
            </div>

            <section className="main__mentors">
                <Mentor />
                <Mentor />
                <Mentor />
                <Mentor />
                <Mentor />
                <Mentor />
                <Mentor />
                <Mentor />
                <Mentor />
                <Mentor />
            </section>

            {showSetMentor && <SetMentor onClose={() => setShowSetMentor(false)} />}

            {/* Render MentorPage for testing panels/tags */}
            {showMentorPage && (
                <div style={{ marginTop: 18 }}>
                    <MentorPage
                        items={['Alice Johnson', 'Bob Martin', 'Carla Gomez', 'Dmitri Ivanov']}
                        initialSettings={{
                            homework: true,
                            tests: true,
                            showTeachLike: true,
                            teachLike: 'a friend',
                            showDifficulty: true,
                            difficulty: 'medium',
                        }}
                    />
                </div>
            )}
        </main>
    );
};

export default Main;
