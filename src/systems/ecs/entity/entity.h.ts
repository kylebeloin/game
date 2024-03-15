import { IAwake, IUpdate, IRegisterable } from "@/utils";

export interface IEntity extends IAwake, IUpdate, IRegisterable {}
