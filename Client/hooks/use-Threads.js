import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { httpGet } from '@/lib/http';


const keys = {
    all: ['threads'],
    lists: () => [...keys.all, 'list'],
    detail: (id) => [...keys.all, 'detail', id],
};

export function useThreads() {
    return useQuery({
        queryKey: keys.lists(),
        queryFn: () => httpGet('/threads').then(r => r.threads),
    });
}

export function useThread(id) {
    return useQuery({
        queryKey: keys.detail(id ?? ''),
        queryFn: () => httpGet(`/threads/${id}`).then(r => r.thread),
        enabled: !!id,
    });
}

export function useCreateOrFetchThread() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, body }) =>
            httpGet(`/api/v1/fetch-thread/${id}`, {
                method: 'POST',
                body: JSON.stringify(body),
            }).then(r => r.thread),
        onSuccess: thread => {
            qc.invalidateQueries({ queryKey: keys.lists() });
            qc.setQueryData(keys.detail(thread.threadId), thread);
        },
    });
}

export function useDeleteThread() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: id =>
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/delete-thread/${id}`, { method: 'DELETE' }).then(r => {
                if (!r.ok) throw new Error('Delete failed');
            }),
        onSuccess: (_, id) => {
            qc.removeQueries({ queryKey: keys.detail(id) });
            qc.invalidateQueries({ queryKey: keys.lists() });
        },
    });
}