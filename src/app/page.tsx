import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowIcon,
  WindowControls,
  WindowContent,
  WindowStatusBar,
  WindowStatusField,
} from "@/components/ui/window";

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col gap-8 items-center justify-center">
      {/* Active Window Example */}
      <Window className="w-[400px]">
        <WindowTitleBar>
          <div className="flex items-center gap-1">
            <WindowIcon />
            <WindowTitle>Windows Media Player</WindowTitle>
          </div>
          <WindowControls />
        </WindowTitleBar>
        <WindowContent>
          <div className="win98-border-sunken bg-black h-[200px] flex items-center justify-center text-white">
            Video content area
          </div>
        </WindowContent>
        <WindowStatusBar>
          <WindowStatusField>video data info date recording etc</WindowStatusField>
        </WindowStatusBar>
      </Window>

      {/* Inactive Window Example */}
      <Window active={false} className="w-[400px]">
        <WindowTitleBar>
          <div className="flex items-center gap-1">
            <WindowIcon />
            <WindowTitle>IMAGE CAPTURE INFO</WindowTitle>
          </div>
          <WindowControls showMinimize={false} />
        </WindowTitleBar>
        <WindowContent>
          <div className="win98-border-sunken bg-[#c0c0c0] h-[150px] flex items-center justify-center">
            Image preview area
          </div>
        </WindowContent>
        <WindowStatusBar>
          <WindowStatusField>maybe coordinates or something here</WindowStatusField>
          <WindowStatusField className="flex-none w-[120px]">location date time</WindowStatusField>
        </WindowStatusBar>
      </Window>

      {/* Dialog Example */}
      <Window className="w-[300px]">
        <WindowTitleBar>
          <WindowTitle>Confirm</WindowTitle>
          <WindowControls showMinimize={false} showMaximize={false} />
        </WindowTitleBar>
        <WindowContent className="text-center py-4">
          <p className="mb-4">Are you sure you want to continue?</p>
          <div className="flex justify-center gap-2">
            <button className="px-4 py-1 bg-win98-surface win98-border-raised active:win98-border-pressed">
              OK
            </button>
            <button className="px-4 py-1 bg-win98-surface win98-border-raised active:win98-border-pressed">
              Cancel
            </button>
          </div>
        </WindowContent>
      </Window>
    </main>
  );
}
