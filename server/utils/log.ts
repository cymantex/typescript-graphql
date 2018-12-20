import chalk from "chalk";
import {constants} from "./constants/";

const titleBorderLength = 60;

function sectionTitle(title: string): void {
    console.log(chalk.bold("-".repeat(titleBorderLength)));
    console.log(chalk.bold(title));
    console.log(chalk.bold("-".repeat(titleBorderLength)));
}

function endOfSection(): void {
    console.log(chalk.bold("-".repeat(titleBorderLength) + "\n"));
}

function message(message: string, ...optionalParams: string[]): void {
    if(optionalParams.length > 0){
        console.log(message, optionalParams);
    } else {
        console.log(message);
    }
}

function title(title: string): void {
    console.log(chalk.bold(title));
}

function error(error: string): void {
    console.log(chalk.red(error));
}

function success(success: string): void {
    console.log(chalk.green(success));
}

export const log = (constants.isTest) ? {
    sectionTitle: () => {},
    endOfSection: () => {},
    error: () => {},
    success: () => {},
    title: () => {},
    message: () => {}
} : {
    sectionTitle,
    endOfSection,
    error,
    success,
    title,
    message
};