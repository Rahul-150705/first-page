export default function CourseCard({ course }) {
  return (
    <div className="bg-white border border-orange-100 rounded-lg p-4 flex flex-col h-full hover:border-orange-400 transition shadow-sm">
      <div className="text-xs font-semibold text-orange-500 mb-2 uppercase tracking-wide">
        {course.skillName}
      </div>
      <h4 className="text-gray-900 font-medium mb-1 line-clamp-2">{course.courseName}</h4>
      <p className="text-gray-500 text-sm mb-4">{course.provider} • {course.durationWeeks} Weeks</p>
      
      <div className="mt-auto">
        <a href={course.courseUrl} target="_blank" rel="noreferrer" 
           className="w-full text-center block bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 font-medium py-2 px-4 rounded transition">
          Enroll Now
        </a>
      </div>
    </div>
  );
}
