import React, { useState } from 'react';

type Props = {
    onClose: () => void;
};

const SetMentor: React.FC<Props> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [setWhen, setSetWhen] = useState<'now' | 'later'>('later');
    const [settings, setSettings] = useState({
        homework: false,
        tests: false,
        teachLike: '',
        difficulty: 'medium',
        showTeachLike: false,
        showDifficulty: false,
    });

    const handleCheckbox =
        (key: 'homework' | 'tests') => (e: React.ChangeEvent<HTMLInputElement>) => {
            setSettings((prev) => ({ ...prev, [key]: e.target.checked }));
        };

    const handleToggle =
        (key: 'showTeachLike' | 'showDifficulty') => (e: React.ChangeEvent<HTMLInputElement>) => {
            setSettings((prev) => ({ ...prev, [key]: e.target.checked }));
        };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name,
            setWhen,
            settings: setWhen === 'now' ? settings : null,
        };
        console.log('Set mentor payload:', payload);
        // TODO: call API
        onClose();
    };

    const handleCancel = () => {
        // optional reset (parent will unmount modal)
        setName('');
        setSetWhen('later');
        setSettings({
            homework: false,
            tests: false,
            teachLike: '',
            difficulty: 'medium',
            showTeachLike: false,
            showDifficulty: false,
        });
        onClose();
    };

    return (
        <div className="modal__bg" role="dialog" aria-modal="true">
            <form className="modal" onSubmit={handleSubmit}>
                <h2 className="modal__title">Set Mentor</h2>

                <div className="modal__settings">
                    <label htmlFor="mentor-name">
                        Mentor name
                        <input
                            id="mentor-name"
                            type="text"
                            placeholder="Mentor name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <fieldset>
                        <legend>When</legend>
                        <label htmlFor="set-now">
                            <input
                                id="set-now"
                                type="radio"
                                name="setWhen"
                                value="now"
                                checked={setWhen === 'now'}
                                onChange={() => setSetWhen('now')}
                            />
                            Set now
                        </label>

                        <label htmlFor="set-later">
                            <input
                                id="set-later"
                                type="radio"
                                name="setWhen"
                                value="later"
                                checked={setWhen === 'later'}
                                onChange={() => setSetWhen('later')}
                            />
                            Later
                        </label>
                    </fieldset>

                    {setWhen === 'now' && (
                        <div className="modal__now-settings">
                            <fieldset>
                                <legend>Settings</legend>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={settings.homework}
                                        onChange={handleCheckbox('homework')}
                                    />
                                    Homework
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={settings.tests}
                                        onChange={handleCheckbox('tests')}
                                    />
                                    Tests
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={settings.showTeachLike}
                                        onChange={handleToggle('showTeachLike')}
                                    />
                                    Enable "Teach me like"
                                </label>

                                {settings.showTeachLike && (
                                    <label htmlFor="teach-like">
                                        Teach me like
                                        <input
                                            id="teach-like"
                                            type="text"
                                            placeholder='e.g. "a friend", "a professor"'
                                            value={settings.teachLike}
                                            onChange={(e) =>
                                                setSettings((s) => ({
                                                    ...s,
                                                    teachLike: e.target.value,
                                                }))
                                            }
                                        />
                                    </label>
                                )}
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={settings.showDifficulty}
                                        onChange={handleToggle('showDifficulty')}
                                    />
                                    Enable Difficulty
                                </label>
                            </fieldset>

                            {settings.showDifficulty && (
                                <label htmlFor="difficulty">
                                    Difficulty
                                    <select
                                        id="difficulty"
                                        value={settings.difficulty}
                                        onChange={(e) =>
                                            setSettings((s) => ({
                                                ...s,
                                                difficulty: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </label>
                            )}
                        </div>
                    )}
                </div>

                <div className="modal__actions">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button type="button" className="btn" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SetMentor;
