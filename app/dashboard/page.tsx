import { redirect } from "next/navigation";

import Todo from "../components/Todo";

import { createClient } from "../../utils/supabase/server";

const Dasboard = async () => {
  const supabase = createClient();

  // Get user data
  const user = (await supabase.auth.getUser()).data.user;

  // Redirect to the login page if the user is not logged in
  if (!user) {
    redirect("/login");
  }

  // Get Todo list items
  const todoList = (await supabase.from("todos").select("*")).data || [];

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-4">
        {
          // Show the user's email address if they are logged in
          user ? (
            <h1 className="text-2xl">Bienvenido, {user.email}</h1>
          ) : (
            <h1 className="text-2xl font-black">Bienvenido, Invitado)?</h1>
          )
        }
        <h2 className="text-lg">Este es el dashboard</h2>
        {/* Boton para añaadir una nueva tarea */}
        <a className="bg-green-500 text-white p-2 rounded-lg" href="/dashboard/new">
          Nueva tarea
        </a>
        {/* This dashboard is for a todo list */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg">Lista de quehaceres</h2>
          <div className="flex flex-row flex-wrap w-full col-span-5 row-span-5">
            {todoList.map((todo) =>
              // Check if the todo item is completed, if is, don't show it
              !todo.is_complete ? (
                <Todo key={todo.id} {...todo} />
              ) : null
            )}
          </div>
          <h2 className="text-lg">Tareas completadas</h2>
          <div className="flex flex-row flex-wrap w-full">
            {todoList.map((todo) =>
              // Check if the todo item is completed, if is, show it
              todo.is_complete ? (
                <Todo key={todo.id} {...todo} />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
