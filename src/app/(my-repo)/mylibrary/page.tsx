import LibraryList from "../_components/LibraryList";
import UserItem from "../_components/UserItem";

export default function MyLibraryPage() {
  return (
    <div className="px-4 py-4 md:px-[300px] md:py-12">
      <UserItem />
      <LibraryList type="REPO" />
    </div>
  );
}