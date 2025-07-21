import { Text } from "@/components/ui/text";
import { TodoStatus, TTodo } from "@/types/TTodo";
import Todo from "./Todo";

type TodoListGroupProps = {
    title: TodoStatus
    data: TTodo[],
    changeStatus: (id: number, name: string) => void,
    onDeleteTodo: (id: number) => void
};

export default function TodoListGroup({data, title, onDeleteTodo, changeStatus}: TodoListGroupProps) {

    return (
        <>
            <Text size="2xl" className="mb-3 mt-3 mr-6 ml-4">{title}</Text>
            {
                data.map((item: TTodo) => (
                    <Todo onDeleteTodo={onDeleteTodo} changeStatus={changeStatus} key={item.id} item={item} />
                ))
            }
        </>
    );
}
