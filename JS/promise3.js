main();

function main() {
    const promises = [
        new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))
    ]; // 이건 Promise들을 정의해둔 것 - not 실행

    Promise.all(promises).then(result => console.log(result));
}