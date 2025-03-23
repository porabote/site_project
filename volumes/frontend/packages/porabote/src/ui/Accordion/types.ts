import {ReactNode} from "react";

export type AccordionType = {
  children: ReactNode
}

export type AccordionItemType = {
  children: ReactNode
  isOpen: boolean
}

export type AccordionItemBodyType = {
  children: ReactNode
  isOpened: boolean
  className?: string
}

export type AccordionItemTabType = {
  children: ReactNode
}