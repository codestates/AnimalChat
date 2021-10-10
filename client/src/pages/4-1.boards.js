import Posts from '../components/Posts'

export default function Boards({ boardName, mockBgColorPost }) {
  return (
    <div className="boards">
      <h1>boards</h1>
      <Posts mockBgColorPost={'#907FA4'} />
    </div>
  );
}