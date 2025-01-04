import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.length == 0 ? 
        <p className="text-gray-500 text-lg font-medium text-center my-5 p-6 bg-gray-100 border border-gray-300 rounded-md shadow-md max-w-xl">
            No prompts created yet.
        </p> :
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            /> )) 
        }
      </div>
    </section>
  );
};

export default Profile;