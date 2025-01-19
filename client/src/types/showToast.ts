export interface ShowToast {
    toastMsg: string;
    icon: string;
}

export enum ToastMessages {
    ROOM_CREATED = "Room created successfully.",
    SERVER_ISSUE = "Server issue",
    ROOM_ID_COPIED = "Room id copied to clipboard.",
    ENTER_NAME = "Please enter your name.",
    ROOM_JOINED = "Joined",
    PROVIDE_ROOM_ID = "Please provide the room Id.",
    INVALID_ROOM_ID = "Invalid room Id"
}

export enum ToastIcons {
    ROOM_CREATED = "😍",
    SERVER_ISSUE = "😭",
    ROOM_JOINED = "😃",
    ROOM_ID_COPIED = "😊",
    ENTER_NAME = "🥲",
    PROVIDE_ROOM_ID = "👿",
    INVALID_ROOM_ID = "😑"
}