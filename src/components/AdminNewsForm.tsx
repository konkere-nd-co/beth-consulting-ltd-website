"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Notification } from "./Notification";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function AdminNewsForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success'|'error', message: string} | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const [type, setType] = useState(initialData?.type || "article");
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [kicker, setKicker] = useState(initialData?.kicker || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [readMoreText, setReadMoreText] = useState(
    initialData?.read_more_text || "Read more →",
  );

  // Article specific
  const [bodyContent, setBodyContent] = useState(
    initialData?.body_content || "",
  );
  const [externalLink, setExternalLink] = useState(
    initialData?.external_link || "",
  );

  // Mentorship specific - parsed from JSON
  let parsedMentorship = null;
  try {
    if (initialData?.mentorship_data) {
      let parsed = initialData.mentorship_data;
      while (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }
      parsedMentorship = parsed;
    }
  } catch (e) {}

  const initialMentorship = parsedMentorship || {
    dates_tag: "",
    status_text: "",
    apply_link: "",
    weeks: [
      { wk: "Week 01", title: "" },
      { wk: "Week 02", title: "" },
      { wk: "Week 03", title: "" },
      { wk: "Week 04", title: "" },
      { wk: "Week 05", title: "" },
      { wk: "Week 06", title: "" },
    ],
    who_is_it_for: "",
    what_you_will_get: "",
  };
  const [mentorship, setMentorship] = useState(initialMentorship);

  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("type", type);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("kicker", kicker);
    formData.append("summary", summary);
    formData.append("read_more_text", readMoreText);
    formData.append("body_content", bodyContent);

    if (type === "article") {
      formData.append("external_link", externalLink);
    } else {
      formData.append("mentorship_data", JSON.stringify(mentorship));
    }

    if (image) formData.append("image", image);
    if (initialData?.image_url)
      formData.append("existing_image_url", initialData.image_url);

    const url = initialData ? `/api/news/${initialData.id}` : `/api/news`;
    const method = initialData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: formData, // fetch will set content-type multipart/form-data automatically
      });
      if (!res.ok) throw new Error(await res.text());
      
      showNotification('success', 'News item saved successfully!');
      setTimeout(() => router.push("/administrator"), 1500);
    } catch (err: any) {
      showNotification('error', err.message || 'An error occurred');
      setLoading(false);
    }
  };

  const handleWeekChange = (index: number, val: string) => {
    const newWeeks = [...mentorship.weeks];
    newWeeks[index].title = val;
    setMentorship({ ...mentorship, weeks: newWeeks });
  };

  const handleAddWeek = () => {
    const newWeekNum = mentorship.weeks.length + 1;
    const newWeekLabel =
      newWeekNum < 10 ? `Week 0${newWeekNum}` : `Week ${newWeekNum}`;
    setMentorship({
      ...mentorship,
      weeks: [...mentorship.weeks, { wk: newWeekLabel, title: "" }],
    });
  };

  const handleRemoveWeek = (index: number) => {
    const newWeeks = mentorship.weeks.filter(
      (_: any, i: number) => i !== index,
    );
    const renumberedWeeks = newWeeks.map((w: any, i: number) => {
      const num = i + 1;
      return { ...w, wk: num < 10 ? `Week 0${num}` : `Week ${num}` };
    });
    setMentorship({ ...mentorship, weeks: renumberedWeeks });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "1rem",
    boxSizing: "border-box" as const,
  };
  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: 600,
    color: "#333",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      }}
    >
      <Notification notification={notification} />
      <h2 style={{ marginBottom: "1.5rem" }}>
        {initialData ? "Edit" : "Create"} News / Event
      </h2>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div>
          <label style={labelStyle}>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={inputStyle}
          >
            <option value="article">Article / Informatory</option>
            <option value="mentorship">Mentorship Programme</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Kicker (Small text above title)</label>
          <input
            type="text"
            value={kicker}
            onChange={(e) => setKicker(e.target.value)}
            style={inputStyle}
            placeholder="e.g. Mentorship · Announcement"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>
          Slug (URL path - leave blank to auto-generate)
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>
          Summary (Short description for the card/header)
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          style={{ ...inputStyle, minHeight: "80px" }}
        />
      </div>

      <hr
        style={{ margin: "2rem 0", border: "0", borderTop: "1px solid #eee" }}
      />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div>
          <label style={labelStyle}>Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            style={inputStyle}
          />
          {initialData?.image_url && !image && (
            <p
              style={{ fontSize: "0.8rem", color: "#666", marginTop: "-10px" }}
            >
              Current image:{" "}
              <a href={initialData.image_url} target="_blank" rel="noreferrer">
                View
              </a>
            </p>
          )}
        </div>
        <div>
          <label style={labelStyle}>Read More Button Text</label>
          <input
            type="text"
            value={readMoreText}
            onChange={(e) => setReadMoreText(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <hr
        style={{ margin: "2rem 0", border: "0", borderTop: "1px solid #eee" }}
      />

      <div>
        <label style={labelStyle}>Body / Description</label>
        <div style={{ marginBottom: "4rem" }}>
          <ReactQuill
            theme="snow"
            value={bodyContent}
            onChange={setBodyContent}
            style={{ height: "300px" }}
          />
        </div>
      </div>

      {type === "article" ? (
        <div>
          <label style={labelStyle}>
            External Link (Optional - overrides article page if set)
          </label>
          <input
            type="text"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            placeholder="https://..."
            style={inputStyle}
          />
        </div>
      ) : (
        <>
          <h3 style={{ paddingTop: "2rem", fontSize: "1.8rem" }}>
            Mentorship Details
          </h3>
          <p
            style={{
              marginBottom: "1.5rem",
              color: "#666",
              fontSize: "0.9rem",
            }}
          >
            Fill out the specific fields for the mentorship layout.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label style={labelStyle}>Dates / Status Tag</label>
              <input
                type="text"
                value={mentorship.dates_tag}
                onChange={(e) =>
                  setMentorship({ ...mentorship, dates_tag: e.target.value })
                }
                style={inputStyle}
                placeholder="e.g. Now running · 4 June – 9 July 2026"
              />
            </div>
            <div>
              <label style={labelStyle}>Google Form Apply Link (Optional)</label>
              <input
                type="text"
                value={mentorship.apply_link}
                onChange={(e) =>
                  setMentorship({ ...mentorship, apply_link: e.target.value })
                }
                style={inputStyle}
                placeholder="Google Form URL"
              />
            </div>
          </div>

          <hr
            style={{
              margin: "2rem 0",
              border: "0",
              borderTop: "1px solid #eee",
            }}
          />

          <div>
            <label style={labelStyle}>
              Status Text (e.g. applications closed, subscribe below)
            </label>
            <input
              type="text"
              value={mentorship.status_text}
              onChange={(e) =>
                setMentorship({ ...mentorship, status_text: e.target.value })
              }
              style={inputStyle}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h4 style={{ margin: 0 }}>Syllabus / Weeks</h4>
            <button
              type="button"
              onClick={handleAddWeek}
              className="btn btn-outline btn-sm"
              style={{ padding: "4px 10px", fontSize: "0.8rem" }}
            >
              + Add Week
            </button>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}
          >
            {mentorship.weeks.map((w: any, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    paddingTop: "10px",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  {w.wk}
                </div>
                <input
                  type="text"
                  value={w.title}
                  onChange={(e) => handleWeekChange(i, e.target.value)}
                  style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                  placeholder="Session Title"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveWeek(i)}
                  style={{
                    padding: "0.8rem",
                    background: "#fee",
                    color: "red",
                    border: "1px solid #fcc",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
            {mentorship.weeks.length === 0 && (
              <p style={{ color: "#666", fontSize: "0.9rem" }}>
                No weeks added.
              </p>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <div>
              <label style={labelStyle}>
                Who is this for? (Comma separated) (Optional)
              </label>
              <textarea
                value={mentorship.who_is_it_for}
                onChange={(e) =>
                  setMentorship({
                    ...mentorship,
                    who_is_it_for: e.target.value,
                  })
                }
                style={{ ...inputStyle, minHeight: "100px" }}
                placeholder="Admin Professionals, Executive Assistants..."
              />
            </div>
            <div>
              <label style={labelStyle}>
                What you'll get? (Comma separated) (Optional)
              </label>
              <textarea
                value={mentorship.what_you_will_get}
                onChange={(e) =>
                  setMentorship({
                    ...mentorship,
                    what_you_will_get: e.target.value,
                  })
                }
                style={{ ...inputStyle, minHeight: "100px" }}
                placeholder="One-on-one coaching, Workflow structuring..."
              />
            </div>
          </div>

          <hr
            style={{
              margin: "2rem 0",
              border: "0",
              borderTop: "1px solid #eee",
            }}
          />
        </>
      )}

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save News Item"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/administrator")}
          className="btn btn-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
