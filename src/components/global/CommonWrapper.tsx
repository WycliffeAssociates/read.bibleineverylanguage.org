import { set } from "idb-keyval";
import type { JSX } from "solid-js";

interface CommonWrapperProps {
	children: JSX.Element;
	resourceType: string;
}

export function CommonWrapper(props: CommonWrapperProps) {
	/* 
  instead of worrying about passing props however deep down to components in the tree... for a fairly simple bit of functionality to be shared accross any/all components, types.ts defines the interface for these custom events. that way all template types can just create an event and fire it off for the history api or sw cache.  the sw api calls are cached (when js is available), but its nice to have the current html page also cached since the api response is not enough by itself to generate a page if having gone offline.
  */
	function setLastPageVisited(url: string) {
		return set("lastPageVisited", url);
	}
	function closeQrDialog(e: KeyboardEvent | MouseEvent) {
		const dialog = document.getElementById("qrDialog") as HTMLDialogElement;
		if (e instanceof KeyboardEvent && e.key === "Escape") {
			dialog.close();
		}
		if (e instanceof MouseEvent && e.target === dialog) {
			dialog.close();
		}
	}
	

	return (
		<div
			data-resourcetype={`resource-${props.resourceType}`}
			data-testid="page-container"
			id="commonWrapper"
			class={`bg-[--clrBackground] font-sans resourceType-${props.resourceType}`}
			on:setLastPageVisited={(
				e: CustomEvent<{
					url: string;
				}>,
			) => {
				setLastPageVisited(e.detail.url);
			}}
		>
			{props.children}
			<dialog
        id="qrDialog"
        class="relative p-4 m-auto"
        onKeyDown={(e) => {
          closeQrDialog(e);
        }}
        onClick={(e) => {
          closeQrDialog(e);
        }}
      >
        <div class="flex flex-col gap-1rem items-center justify-center">
          <button
            class="absolute top-2 start-2"
            type="button"
            id="closeQrDialog"
            onClick={() => {
              const el = document.getElementById(
                "qrDialog"
              ) as HTMLDialogElement;
              if (el) {
                el.close();
              }
            }}
            autofocus
          >
            <span class="w-1.5em h-1.5em text-red-500">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
						</span>
          </button>
          <canvas id="qrCanvas"/>
        </div>
      </dialog>
		</div>
	);
}
