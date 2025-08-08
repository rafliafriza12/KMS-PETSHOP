import { JSX } from "react";
import { z } from "zod";

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export interface ShapeProps {
  className: string;
  as?: keyof JSX.IntrinsicElements;
}
export interface ButtonType {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface TextProps {
  className?: string;
  children: React.ReactNode;
}

export interface SidebarProps {
  title: string;
  href: string;
  icon: any;
}

export interface DropdownProps {
  Keluar: {
    title: string;
    href: string;
  };
  Pengaturan: {
    title: string;
    href: string;
  };
}

export interface ToolTipProps {
  content: any;
  children?: React.ReactNode;
}

type ToastType = "success" | "error" | "warning" | "info" | "question";
export interface ModalProps {
  title: string;
  icon: ToastType;
  deskripsi: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

export interface ToastProps {
  title: string;
  icon?: ToastType;
  message: string;
  onVoid?: () => void;
}

export interface AlertContexType {
  toast: (p: ToastProps) => void;
  modal: (p: ModalProps) => void;
  confirm: (p: ModalProps) => Promise<boolean>;
}

export interface FallbackProps {
  title: string;
  className?: string;
}

export const showName = z.object({
  ktp: z.string().nullable(),
  izinUsaha: z.string().nullable(),
  logo: z.string().nullable(),
  proposalBrand: z.string().nullable(),
});

export interface PopUpProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export interface SearchingProps {
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type showNameProps = z.infer<typeof showName>;
