import {
	IconBookMark,
	IconClock,
	IconClose,
	IconDocument,
	IconWeb,
} from "@components/Icons/Icons";
import type {
	ISavedInServiceWorkerStatus,
	repoIndexObj,
} from "@customTypes/types";
import { Dialog } from "@kobalte/core/dialog";
import { intlDate } from "@lib/utils";
import { getPortalSpot } from "@lib/utils-ui";
import type { Translator } from "@solid-primitives/i18n";
import QRCode from "qrcode";
import type { Accessor, Resource, Setter } from "solid-js";
import type { storeType } from "../ReaderWrapper/ReaderWrapper";
import { DownloadSection } from "./DownloadSection";
import { OfflineSection } from "./OfflineSection";
import { DetailItem, SectionHeader } from "./index";


interface settingsProps {
	settingsAreOpen: Accessor<boolean>;
	setSettingsOpen: Setter<boolean>;
	topAmount: () => string;
	repoIndex: repoIndexObj;
	storeInterface: storeType;
	savedInServiceWorker: Resource<ISavedInServiceWorkerStatus>;
	user: string;
	repo: string;
	downloadSourceUsfmArr: repoIndexObj["downloadLinks"];
	setPrintWholeBook: Setter<boolean>;
	refetchSwResponses: (
		info?: unknown,
	) =>
		| ISavedInServiceWorkerStatus
		| Promise<ISavedInServiceWorkerStatus | undefined>
		| null
		| undefined;
	t: Translator<Record<string, string>>;
}

export default function Settings(props: settingsProps) {
	const resTypeName = () => {
		return (
			props.repoIndex.resourceType?.charAt(0).toLocaleUpperCase() +
			props.repoIndex.resourceType?.slice(1)
		);
	};

	return (
		<Dialog open={props.settingsAreOpen()} onOpenChange={props.setSettingsOpen}>
			<Dialog.Portal mount={getPortalSpot()}>
				<Dialog.Overlay
					data-title="dialog__overlay"
					class="fixed inset-0 z-50 hidden bg-black/20 data-[expanded]:block print:hidden"
				/>
				<Dialog.Content
					style={{
						top: props.topAmount(),
					}} 
					onInteractOutside={(e) => {
						// if the qrcode dialog open close it, else noop pass through; 
						console.log(e)
						// debugger
						const qrDialog = document.getElementById("qrDialog") as HTMLDialogElement;
						if (qrDialog?.open) {
							e.preventDefault();
							// qrDialog.close();
						}
					}}
					data-title="dialog__settings__content"
					class="fixed right-0 top-0 z-[60] max-h-[90vh] max-w-sm transform animate-[fadeOut_.25s_ease-in-out_forwards] overflow-scroll bg-white px-4 pb-40 pt-3 data-[expanded]:animate-[fadeIn_.25s_ease-in-out_forwards] print:hidden"
				>
					<div
						data-title="dialog__header"
						class="relative mb-8 flex items-center justify-between"
					>
						<Dialog.Title
							data-title="dialog__title"
							class="text-xl font-bold md:text-2xl"
						>
							{props.t("settings")}
						</Dialog.Title>
						<Dialog.CloseButton
							data-title="dialog__close-button"
							class="border-gray block rounded-md border border-gray-200 p-3 px-4 text-darkAccent hover:bg-gray-100 focus:outline-2 focus:outline-accent ltr:ml-auto rtl:mr-auto"
						>
							<IconClose />
						</Dialog.CloseButton>
					</div>
					<div data-title="detailsSection">
						{/* <h2 class="mb-4 text-lg font-bold">Details</h2> */}
						<SectionHeader component="h2" text={props.t("details")} />
						<ul class="flex flex-col gap-3">
							<DetailItem
								icon={<IconDocument />}
								header={props.t("resourceType")}
								detail={resTypeName()}
							/>
							<DetailItem
								icon={<IconBookMark />}
								header={props.t("currentBook")}
								detail={props.storeInterface.currentBookObj()?.label || ""}
							/>
							<DetailItem
								icon={<IconWeb />}
								header={props.t("language")}
								detail={props.repoIndex.languageName}
							/>
							<DetailItem
								icon={<IconClock />}
								header={props.t("lastModified")}
								detail={intlDate(
									props.repoIndex.lastRendered,
									[...navigator.languages],
									{
										dateStyle: "medium",
									},
								)}
							/> 
						</ul>
						<div>
						<button type="button" class="underline  mt-6 flex gap-1 text-accent" onClick={() => {
        const dialog = document.getElementById("qrDialog") as HTMLDialogElement;
        const smallestDimension = Math.min(
          window.innerWidth,
          window.innerHeight
        );
        const width = Math.max(200, smallestDimension * 0.6);
        dialog?.showModal();
        const canvas = document.getElementById("qrCanvas") as HTMLCanvasElement;
        if (!canvas) return;
        QRCode.toCanvas(canvas, window.location.href, {width: width});
      }}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 11h8V3H3zm2-6h4v4H5zM3 21h8v-8H3zm2-6h4v4H5zm8-12v8h8V3zm6 6h-4V5h4zm-5.99 4h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm2 2h2v2h-2zm-4 0h2v2h-2zm2-6h2v2h-2zm2 2h2v2h-2z"/></svg>
						Share as QR code
						</button>
						</div>
						<span class="my-9 block h-[1px] w-full bg-gray-200" />
					</div>
					<div data-title="offlineSection" class="">
						<OfflineSection
							t={props.t}
							repoIndex={props.repoIndex}
							savedInServiceWorker={props.savedInServiceWorker}
							storeInterface={props.storeInterface}
							repo={props.repo}
							user={props.user}
							refetchSwResponses={props.refetchSwResponses}
						/>
					</div>
					<span class="my-9 block h-[1px] w-full bg-gray-200" />
					<DownloadSection
						t={props.t}
						storeInterface={props.storeInterface}
						repo={props.repo}
						user={props.user}
						savedInServiceWorker={props.savedInServiceWorker}
						setPrintWholeBook={props.setPrintWholeBook}
						downloadSourceUsfmArr={props.downloadSourceUsfmArr}
					/>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
}
