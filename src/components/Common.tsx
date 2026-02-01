import courses from "../data/courses.json"

export function addToCourseCart(courseCart, setCourseCart, dept, num) {
    if (courseCart.length >= 7) return false;
    const newCourseId = getCourseId(dept, num);
    for (const id of courseCart) {
        if (id == newCourseId) return false;
    }
    const newCourseCart = [...courseCart, newCourseId];
    setCourseCart(newCourseCart);
    return true;
}

export function removeFromCourseCart(courseCart, setCourseCart, dept, num) {
    if (courseCart.length <= 0) return false;
    const newCourseId = getCourseId(dept, num);
    for (var i = 0; i < courseCart.length; i++) {
        if (courseCart[i] == newCourseId) {
            const newCourseCart = [...courseCart];
            newCourseCart.splice(i, 1);
            setCourseCart(newCourseCart);
            return true;
        }
    }
    return false;
}

export function getCourseId(dept, num) {
    return dept + "-" + num;
}

export function getCourseArrayIndex(deptNum) {
    for (var i = 0; i < courses.length; i++) {
        var courseId = getCourseId(courses[i].dept, courses[i].number);
        if (courseId == deptNum) {
            return i;
        }
    }
    return -1;
}

export function getCourse(deptNum) {
    var courseIndex = getCourseArrayIndex(deptNum);
    if (courseIndex < 0) {
        return null;
    } else {
        return courses[courseIndex];
    }
}

export function getStringFromCourseCart(courseCart) {
    return courseCart.join(',');
}

export function getCourseCartFromString(courseCartString) {
    if (courseCartString == null) return [];
    return courseCartString.split(',');
}

export function moveCourseInCarts(courseCart, setCourseCart, position) {
    if (!position.destination) {
        return;
    }
    const updatedCourseCart = Array.from(courseCart);
    const [movedCourse] = updatedCourseCart.splice(position.source.index, 1);
    updatedCourseCart.splice(position.destination.index, 0, movedCourse);
    setCourseCart(updatedCourseCart);
}

export const colorBox = (rating, type) => {
    if (rating < 2) {
        if (type == 0) {
            return "#D4AF37";
        } else {
            return "#50C878";
        }
    } else if (rating < 3) {
        return "#6495ED";
    } else {
        if (type == 0) {
            return "#50C878";
        } else {
            return "#D4AF37";
        }
    }
};