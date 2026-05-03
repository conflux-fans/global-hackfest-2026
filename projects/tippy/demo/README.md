# Demo materials

Drop the following files into this folder before submitting the PR:

| File | Spec | Notes |
| --- | --- | --- |
| `demo-video.mp4` | 3–5 min, ≥720p, MP4 with clear narration | Walks the full user journey: connect → create campaign → submit → run AI judging → settle / pay → audit ledger. |
| `participant-intro.mp4` | 30–60 s, 16:9, front-facing, clean audio, simple background | _"I'm [Name] from [Country/City], building Tippy.Fun for Conflux Network's Global Hackfest 2026 and I'm excited to participate."_ |
| `logo.png` | 1:1, ≥500×500, PNG or JPG | Project logo used in the submission form. |
| `screenshots/` | UI stills, PNG preferred | See `screenshots/README.md` for the recommended shot list. |

## Demo video content structure (from the submission guide)

1. **Intro (30 s)** — team, project name, problem statement.
2. **Solution overview (60 s)** — dual modes, AI judging, Conflux integration highlights.
3. **Live demo (2–3 min)** — connect wallet (Privy), create campaign (pick mode + token +
   AI rubric), submit work, run AI judging, settle or auto-pay, show audit ledger.
4. **Technical (60 s)** — architecture overview, `TippyMaker.sol`, verdict hash flow.
5. **Conclusion (30 s)** — impact, roadmap, call to action.

## Hosting tips

- **YouTube unlisted** or Vimeo is the recommended route; the hackathon submission form
  accepts a video URL, so drop the link into `../links.md` under **Demo video** and the
  organisers can watch without downloading.
- GitHub caps individual files at 100 MB (50 MB warn). The current `demo-video.mp4` in
  this folder is ~187 MB, which **will be rejected on `git push`** unless you either:
  1. Upload it to YouTube / Vimeo and delete the local file (recommended — smallest repo,
     fastest clone, what the submission template expects), **or**
  2. Enable Git LFS before committing:
     ```bash
     cd <your-global-hackfest-2026-fork>
     git lfs install
     git lfs track "projects/tippy/demo/*.mp4"
     git add .gitattributes projects/tippy/demo/*.mp4
     ```
- `participant-intro.mp4` (~8.7 MB) is well under the GitHub limit and can be committed
  directly without LFS.
- Thumbnail the video with the Tippy logo + "Global Hackfest 2026" text before uploading.
