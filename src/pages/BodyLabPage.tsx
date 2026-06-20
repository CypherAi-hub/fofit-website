import { useState } from "react";

import type { BodyCheckIn } from "../features/body-lab";
import { useBodyLab } from "../features/body-lab";
import { BodyLabUploadCard } from "../features/body-lab/components/BodyLabUploadCard";
import { BodyLabTimelineGrid } from "../features/body-lab/components/BodyLabTimelineGrid";
import { BodyLabMediaViewer } from "../features/body-lab/components/BodyLabMediaViewer";
import { BodyLabEmptyState } from "../features/body-lab/components/BodyLabEmptyState";
import { BodyLabErrorState } from "../features/body-lab/components/BodyLabErrorState";
import { PageMeta } from "../components/layout/PageMeta";
import "../features/body-lab/bodyLab.css";

export function BodyLabPage() {
  const bodyLab = useBodyLab();
  const [active, setActive] = useState<BodyCheckIn | null>(null);

  return (
    <>
      <PageMeta title="Body Lab | FoFit" description="Your private FoFit progress photos and timeline." />
      <div className="bodylab">
        <header className="bodylab__head">
          <span className="bodylab__eyebrow">◆ Body Lab</span>
          <h1 className="bodylab__title">Your private progress</h1>
          <p className="bodylab__sub">
            Capture progress and pump photos or video and watch your body change over time.
            Everything here is private to your account — only you can see it.
          </p>
        </header>

        <BodyLabUploadCard
          uploadProgress={bodyLab.uploadProgress}
          uploadError={bodyLab.uploadError}
          onUpload={bodyLab.upload}
          onCancel={bodyLab.cancelUpload}
          onClearError={bodyLab.clearUploadError}
        />

        <section aria-label="Your check-in timeline">
          {bodyLab.timeline.status === "loading" && (
            <div className="bodylab-state">
              <div className="bodylab-spinner" />
              <span>Loading your timeline…</span>
            </div>
          )}
          {bodyLab.timeline.status === "error" && (
            <BodyLabErrorState message={bodyLab.timeline.message} onRetry={bodyLab.refresh} />
          )}
          {bodyLab.timeline.status === "ready" &&
            (bodyLab.timeline.checkIns.length === 0 ? (
              <BodyLabEmptyState />
            ) : (
              <BodyLabTimelineGrid
                checkIns={bodyLab.timeline.checkIns}
                thumbUrls={bodyLab.thumbUrls}
                onOpen={setActive}
              />
            ))}
        </section>
      </div>

      {active && (
        <BodyLabMediaViewer
          checkIn={active}
          signMediaUrl={bodyLab.signMediaUrl}
          onClose={() => setActive(null)}
          onDelete={bodyLab.remove}
        />
      )}
    </>
  );
}
