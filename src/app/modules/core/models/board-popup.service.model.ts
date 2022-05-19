export interface BoardPopupSubject {
  popupFunction: PopupFunction;
  isOpen: boolean;
}

export type PopupFunction = 'create' | 'edit';
