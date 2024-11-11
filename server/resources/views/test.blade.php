<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
</head>
<body>
    <h1>Course List</h1>
    <ul>
        @foreach ($courses as $course) <!-- Loop through the courses -->
            <li>
                <strong>Course Name:</strong> {{ $course['course_name'] }}<br>
                <strong>Description:</strong> {{ $course['description'] }}<br>
                <strong>Start Date:</strong> {{ $course['startDate'] }}<br>
                <strong>End Date:</strong> {{ $course['endDate'] }}<br>
                <strong>Teacher ID:</strong> {{ $course['teacher_id'] }}<br>
                <strong>Image:</strong> <img src="{{ $course['image'] }}" alt="Course Image" style="width: 100px;"><br>
                <strong>Video:</strong> <a href="{{ $course['video'] }}">Watch Video</a><br>
            </li>
        @endforeach
    </ul>
</body>
</html>
