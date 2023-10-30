type Subscriber<T> = (data: T) => void;

class Observer<T> {
    data: T;
    subscribers: Map<number, Subscriber<T>>;
    subscribers_length: number;

    constructor(initialData: T) {
        this.data = initialData;
        this.subscribers = new Map<number, Subscriber<T>>();
        this.subscribers_length = 0;
    }

    subscribe(subscriber: Subscriber<T>) {
        const id = this.subscribers_length++;

        this.subscribers.set(id, subscriber);

        return () => {
            this.subscribers_length--;

            this.subscribers.delete(id);
        };
    }

    update(newData: T) {
        this.data = newData;

        for (const sub of this.subscribers.values()) {
            sub(this.data);
        }
    }
}

export default Observer;
