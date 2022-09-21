import React from 'react'
import { STATS_GET } from '../../Api'
import useFetch from '../../Hooks/useFetch'
import Error from '../Error/Error'
import Head from '../Head/Head'
import Loading from '../Loading/Loading'


const UserStatsGraphs = React.lazy(() => import("../UserStatsGraphs/UserStatsGraphs"))


const UserStats = () => {
    const { data, error, loading, request } = useFetch()

    React.useEffect(() => {
        async function getData() {
            const { url, options } = STATS_GET()
            await request(url, options)
        }
        getData()
    }, [request])

    if (loading) return <Loading />
    if (error) return <Error error={error} />
    if (data)
        return (
            <React.Suspense fallback={<div></div>}>
                <Head title="Estatisticas" />
                <UserStatsGraphs data={data} />
            </React.Suspense>
        )
    else return null;
}

export default UserStats