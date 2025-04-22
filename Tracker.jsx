
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const habits = [
  "Morning Surrender Prayer",
  "Evening Self-Check-In",
  "Grace-Focused Journaling",
  "Scripture Meditation",
  "Silence & Stillness (5–10 min)",
  "Prayerful Decision-Making",
  "Celebrate One Area of Growth (Sun)",
  "Life Story Reflection (Sun)",
  "Accountability Check-In (Sun)",
  "God Handles Outcomes Reminder",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

export default function DigitalHabitTracker() {
  const [checked, setChecked] = useState({});
  const [monthlyChecked, setMonthlyChecked] = useState({});
  const [verse, setVerse] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const storedChecked = JSON.parse(localStorage.getItem("weeklyChecked") || "{}");
    const storedMonthlyChecked = JSON.parse(localStorage.getItem("monthlyChecked") || "{}");
    const storedVerse = localStorage.getItem("verse") || "";
    const storedNotes = localStorage.getItem("notes") || "";
    setChecked(storedChecked);
    setMonthlyChecked(storedMonthlyChecked);
    setVerse(storedVerse);
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("weeklyChecked", JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    localStorage.setItem("monthlyChecked", JSON.stringify(monthlyChecked));
  }, [monthlyChecked]);

  useEffect(() => {
    localStorage.setItem("verse", verse);
  }, [verse]);

  useEffect(() => {
    localStorage.setItem("notes", notes);
  }, [notes]);

  const toggleCheck = (habit, day) => {
    const key = `${habit}_${day}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMonthlyCheck = (habit, week) => {
    const key = `${habit}_${week}`;
    setMonthlyChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Spiritual & Psychological Balance Tracker</h1>

      <Tabs defaultValue="weekly">
        <TabsList className="mb-4">
          <TabsTrigger value="weekly">Weekly Tracker</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <div className="mb-6">
            <label className="block text-yellow-600 font-semibold mb-1">Weekly Verse or Theme</label>
            <input
              type="text"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Write your verse or theme for the week"
            />
          </div>

          <table className="w-full border text-sm mb-8">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="p-2 text-left">Habit</th>
                {days.map((day) => (
                  <th key={day} className="p-2">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit} className="border-t">
                  <td className="p-2 font-medium text-gray-700">{habit}</td>
                  {days.map((day) => (
                    <td key={day} className="text-center">
                      {(habit.includes("Sun") && day !== "Sun") ? null : (
                        <input
                          type="checkbox"
                          checked={!!checked[`${habit}_${day}`]}
                          onChange={() => toggleCheck(habit, day)}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-6">
            <label className="block text-yellow-600 font-semibold mb-1">Reflection Prompts</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="• What did I learn this week?\n• How did I see God move?\n• What habits strengthened me most?"
            ></textarea>
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Monthly Habit Overview</h2>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="p-2 text-left">Habit</th>
                {weeks.map((week) => (
                  <th key={week} className="p-2">{week}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit} className="border-t">
                  <td className="p-2 font-medium text-gray-700">{habit}</td>
                  {weeks.map((week) => (
                    <td key={week} className="text-center">
                      <input
                        type="checkbox"
                        checked={!!monthlyChecked[`${habit}_${week}`]}
                        onChange={() => toggleMonthlyCheck(habit, week)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
