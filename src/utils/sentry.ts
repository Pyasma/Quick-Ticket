import * as Sentry from "@sentry/nextjs";

type logLevel = 'warning' | 'info' | 'fatal' | 'error' | 'debug';

export async function logEvent( message:string,
    category: string = 'general',
    data?: Record<string, unknown>,
    level: logLevel = 'info',
    error?: unknown
) {
    Sentry.addBreadcrumb({
        category,
        message,
        data,
        level,
    });

    if (error) {
        Sentry.captureException(error, {extra: data})
    }else {
        Sentry.captureMessage(message, level)
    }
}