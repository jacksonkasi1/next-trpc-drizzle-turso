"use client"

import { api } from "@/trpc/react"

const Page = () => {

    const { data } = api.class.get.useQuery({ limit: 10, page: 0 })
    const workshopApi = api.workshop.get.useQuery({ limit: 10, page: 0 })
    return (
        <div>
            <div>page</div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <pre>{JSON.stringify(workshopApi.data, null, 2)}</pre>
        </div>
    )
}

export default Page