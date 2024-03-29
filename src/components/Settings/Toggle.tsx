import { IconX, IconCheck } from "@components/Icons/Icons";
import { ToggleButton } from "@kobalte/core";
import { Show } from "solid-js";

interface IDetailItem {
  pressed?: boolean;
  onChangeFxn: (isPressed: boolean) => void;
}
export default function DetailItem(props: IDetailItem) {
  return (
    <ToggleButton.Root
      onChange={props.onChangeFxn}
      class="toggle-button"
      aria-label="Toggle offline"
      pressed={props.pressed}
    >
      {(state) => (
        <span
          data-name="toggleTrack"
          class={`relative inline-block h-[24px] w-[48px] rounded-full bg-slate-700 p-[1px] ${
            state.pressed() && "!bg-accent"
          }`}
        >
          <span
            data-name="toggleSlider"
            class={`absolute top-0 flex h-[24px] w-[24px] items-center justify-center rounded-full text-white transition-all duration-200 ease-in-out rtl:left-0 ${
              state.pressed() && " translate-x-[22px] transform"
            }`}
          >
            <Show when={state.pressed()} fallback={<IconX />}>
              <IconCheck />
            </Show>
          </span>
        </span>
      )}
    </ToggleButton.Root>
  );
}
