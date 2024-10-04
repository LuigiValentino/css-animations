function generateCSS() {
    const name = document.getElementById('name').value;
    const duration = document.getElementById('duration').value;
    const delay = document.getElementById('delay').value;
    const timingFunction = document.getElementById('timingFunction').value;
    const transform = document.getElementById('transform').value;
    const iterationCount = document.getElementById('iterationCount').value;
    const direction = document.getElementById('direction').value;
    const playState = document.getElementById('playState').value;
    const color = document.getElementById('color').value;
    const shape = document.getElementById('shape').value;

    const keyframes = `@keyframes ${name} {
        from {
            transform: none;
        }
        to {
            transform: ${transform};
        }
    }`;

    const shapeStyle = shape === 'circle' ? 'border-radius: 50%;' : '';

    const animationCSS = `
    ${keyframes}
    
    .${name} {
        animation: ${name} ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${playState};
        background-color: ${color};
        ${shapeStyle}
    }`;

    document.getElementById('generatedCode').innerText = animationCSS;

    
    const oldStyles = document.getElementById('dynamic-styles');
    if (oldStyles) oldStyles.remove();

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.id = 'dynamic-styles';
    styleSheet.innerText = animationCSS;
    document.head.appendChild(styleSheet);

    const previewElement = document.getElementById('previewElement');
    previewElement.className = 'animation-preview ' + name;
}

function runAnimation() {
    const previewElement = document.getElementById('previewElement');
    previewElement.style.animation = 'none';
    previewElement.offsetHeight; 
    previewElement.style.animation = '';
}

document.getElementById('animationForm').addEventListener('input', generateCSS);
document.getElementById('runAnimation').addEventListener('click', runAnimation);

document.getElementById('predefinedAnimations').addEventListener('change', function() {
    const selectedValue = this.value;
    const predefinedOptions = {
        bounce: { name: 'bounce', duration: '2', transform: 'translateY(-50px)' },
        rotate: { name: 'rotate', duration: '2', transform: 'rotate(360deg)' },
        scale: { name: 'scale', duration: '2', transform: 'scale(1.5)' },
        fade: { name: 'fade', duration: '2', transform: 'opacity(0)' },
        slide: { name: 'slide', duration: '2', transform: 'translateX(100px)' }
    };

    if (predefinedOptions[selectedValue]) {
        const { name, duration, transform } = predefinedOptions[selectedValue];
        document.getElementById('name').value = name;
        document.getElementById('duration').value = duration;
        document.getElementById('transform').value = transform;
        generateCSS();
    }
});

document.getElementById('downloadCode').addEventListener('click', function() {
    const code = document.getElementById('generatedCode').innerText;
    const blob = new Blob([code], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'animation.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

document.getElementById('shape-square').addEventListener('click', function() {
    document.getElementById('shape').value = 'square';
    generateCSS();
});

document.getElementById('shape-circle').addEventListener('click', function() {
    document.getElementById('shape').value = 'circle';
    generateCSS();
});

document.addEventListener('DOMContentLoaded', generateCSS);