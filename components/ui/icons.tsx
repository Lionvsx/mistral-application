import { cn } from "@/lib/utils";

export function BoltIcon({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="17"
            viewBox="0 0 14 17"
            fill="currentColor"
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <title>bolt-icon</title>
            <path d="M13.1541 7.04098C12.9821 6.70798 12.6411 6.49998 12.2661 6.49998H8.08013L8.59713 1.37598C8.66213 0.917985 8.40813 0.477983 7.97712 0.305983C7.54812 0.133983 7.05912 0.278982 6.79112 0.655985L0.918121 8.92098C0.701121 9.22798 0.674121 9.62598 0.846121 9.95898C1.01812 10.292 1.35912 10.5 1.73412 10.5H5.92012L5.40312 15.624C5.33812 16.082 5.59212 16.522 6.02312 16.694C6.14412 16.742 6.27013 16.766 6.39513 16.766C6.71113 16.766 7.01712 16.615 7.20912 16.344L13.0831 8.07899C13.3001 7.77199 13.3261 7.37398 13.1541 7.04098Z"></path>
        </svg>
    )
}

export function ReturnIcon({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="9"
            fill="none"
            viewBox="0 0 12 9"
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <title>arrow-right</title>
            <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10.75 5.25H2.25C1.6977 5.25 1.25 4.8023 1.25 4.25V1.75C1.25 1.1977 1.6977 0.75 2.25 0.75H4" />
            <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8.25 2.5L11 5.25L8.25 8" />
        </svg>
    )
}

export function Hammer2({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="256"
            height="256"
            fill="currentColor"
            viewBox="0 0 18 18"
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <title>hammer 2</title>
            <path d="M7.835,7.208L2.186,12.857c-.814,.815-.814,2.142,0,2.957,.395,.395,.92,.612,1.479,.612s1.084-.217,1.479-.612l5.649-5.649-2.957-2.957Z"></path>
            <path d="M16.737,6.999L11.987,2.249c-.277-.277-.644-.455-1.033-.5l-4.19-.493c-.228-.03-.456,.052-.618,.214l-.434,.434c-.293,.293-.293,.768,0,1.061l7.53,7.531c.341,.341,.789,.512,1.237,.512s.896-.17,1.237-.512l1.021-1.021c.33-.331,.513-.77,.513-1.238s-.182-.907-.513-1.237Z"></path>
        </svg>
    )
}

export function ArrowRight({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 20 20"
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <title>arrow triangle line right</title>
            <line stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="11" y1="10" y2="10" />
            <path d="m11.82,14.317l4.719-3.932c.24-.2.24-.568,0-.768l-4.719-3.932c-.326-.271-.82-.04-.82.384v7.865c0,.424.494.655.82.384Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
    )
}



