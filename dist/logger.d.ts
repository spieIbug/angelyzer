import { Chalk } from 'chalk';
export declare class Logger {
    static info(message: string | Chalk, ...datas: any[]): void;
    static success(message: string | Chalk, ...datas: any[]): void;
    static error(message: string | Chalk, ...datas: any[]): void;
    static warning(message: string | Chalk, ...datas: any[]): void;
}
