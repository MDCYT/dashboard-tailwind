import moment from "moment";
import "moment/locale/es";

interface TodoProps {
    id: number;
    task: string;
    inserted_at: string;
    is_complete: boolean;
}

const Todo = ({ id, task, inserted_at, is_complete }: TodoProps) => {
  return (
    <div
      key={id}
      className="flex flex-col items-center justify-between p-4 my-2 bg-gray-100 rounded-lg mx-4 w-96"
    >
      <div>
        <h3 className="text-lg font-bold text-center">{task}</h3>
        {/* Show the time, example, 30 minutes ago, 2 hours ago */}
        <p>{moment(inserted_at).fromNow()}</p>
      </div>
      <div className="flex flex-row w-full justify-between items-center">
        <a className="bg-blue-500 text-white p-2 rounded-lg" href={is_complete ? `/api/todo/${id}/incomplete` : `/api/todo/${id}/complete`}>
            {is_complete ? "Marcar como incompleta" : "Marcar como completa"}
        </a>
        <a className="bg-red-500 text-white p-2 rounded-lg" href={`/api/todo/${id}/delete`}> Borrar </a>
      </div>
    </div>
  );
};

export default Todo;
