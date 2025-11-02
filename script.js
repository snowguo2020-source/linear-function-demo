// 获取DOM元素
const canvas = document.getElementById('coordinateCanvas');
const ctx = canvas.getContext('2d');
const kSlider = document.getElementById('kSlider');
const bSlider = document.getElementById('bSlider');
const kDisplay = document.getElementById('kDisplay');
const bDisplay = document.getElementById('bDisplay');
const kValue = document.getElementById('kValue');
const bValue = document.getElementById('bValue');
const resetBtn = document.getElementById('resetBtn');
const randomBtn = document.getElementById('randomBtn');
const dynamicExplanation = document.getElementById('dynamicExplanation');
const pointCoords = document.getElementById('pointCoords');

// 坐标系参数
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const scale = 40; // 每单位的像素数
const gridSize = 1; // 网格间距

// 当前函数参数
let k = 1;
let b = 0;

// 鼠标位置
let mouseX = null;
let mouseY = null;

// 初始化
function init() {
    updateFunction();
    addEventListeners();
}

// 添加事件监听
function addEventListeners() {
    kSlider.addEventListener('input', (e) => {
        k = parseFloat(e.target.value);
        updateFunction();
    });

    bSlider.addEventListener('input', (e) => {
        b = parseFloat(e.target.value);
        updateFunction();
    });

    resetBtn.addEventListener('click', () => {
        k = 1;
        b = 0;
        kSlider.value = k;
        bSlider.value = b;
        updateFunction();
    });

    randomBtn.addEventListener('click', () => {
        k = Math.floor(Math.random() * 11) - 5; // -5 到 5
        if (k === 0) k = 1; // 确保 k ≠ 0
        b = Math.floor(Math.random() * 11) - 5; // -5 到 5
        kSlider.value = k;
        bSlider.value = b;
        updateFunction();
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        drawCoordinateSystem();
    });

    canvas.addEventListener('mouseleave', () => {
        mouseX = null;
        mouseY = null;
        pointCoords.textContent = '将鼠标移到直线上查看坐标';
        drawCoordinateSystem();
    });
}

// 更新函数
function updateFunction() {
    kDisplay.textContent = k;
    bDisplay.textContent = b;
    kValue.textContent = k;
    bValue.textContent = b;
    updateExplanation();
    drawCoordinateSystem();
}

// 更新动态解释
function updateExplanation() {
    let explanation = '';
    
    // 关于斜率 k
    if (k > 0) {
        explanation += `✅ 当前斜率 k = ${k} > 0，直线向右上方倾斜，函数值随 x 增大而增大。`;
    } else if (k < 0) {
        explanation += `✅ 当前斜率 k = ${k} < 0，直线向右下方倾斜，函数值随 x 增大而减小。`;
    }
    
    const absK = Math.abs(k);
    if (absK > 3) {
        explanation += `斜率的绝对值 |k| = ${absK} 较大，直线比较陡峭。`;
    } else if (absK < 2) {
        explanation += `斜率的绝对值 |k| = ${absK} 较小，直线比较平缓。`;
    }
    
    explanation += '<br><br>';
    
    // 关于截距 b
    if (b > 0) {
        explanation += `✅ 当前截距 b = ${b} > 0，直线与 y 轴交于正半轴上的点 (0, ${b})。`;
    } else if (b < 0) {
        explanation += `✅ 当前截距 b = ${b} < 0，直线与 y 轴交于负半轴上的点 (0, ${b})。`;
    } else {
        explanation += `✅ 当前截距 b = 0，直线经过原点 (0, 0)。`;
    }
    
    explanation += '<br><br>';
    explanation += `📊 函数表达式：y = ${k}x + ${b}<br>`;
    explanation += `📈 当 x 每增加 1 个单位时，y 会增加 ${k} 个单位。`;
    
    dynamicExplanation.innerHTML = explanation;
}

// 绘制坐标系
function drawCoordinateSystem() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格
    drawGrid();
    
    // 绘制坐标轴
    drawAxes();
    
    // 绘制一次函数图像
    drawLinearFunction();
    
    // 绘制截距点
    drawInterceptPoint();
    
    // 绘制斜率示意图
    drawSlopeTriangle();
    
    // 绘制鼠标位置的点
    if (mouseX !== null && mouseY !== null) {
        drawMousePoint();
    }
}

// 绘制网格
function drawGrid() {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    // 垂直线
    for (let x = centerX % (scale * gridSize); x < canvas.width; x += scale * gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // 水平线
    for (let y = centerY % (scale * gridSize); y < canvas.height; y += scale * gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// 绘制坐标轴
function drawAxes() {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    
    // X轴
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
    
    // Y轴
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    
    // 绘制刻度和标签
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X轴刻度
    for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        const x = centerX + i * scale;
        ctx.beginPath();
        ctx.moveTo(x, centerY - 5);
        ctx.lineTo(x, centerY + 5);
        ctx.stroke();
        ctx.fillText(i.toString(), x, centerY + 20);
    }
    
    // Y轴刻度
    ctx.textAlign = 'right';
    for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        const y = centerY - i * scale;
        ctx.beginPath();
        ctx.moveTo(centerX - 5, y);
        ctx.lineTo(centerX + 5, y);
        ctx.stroke();
        ctx.fillText(i.toString(), centerX - 10, y + 5);
    }
    
    // 原点标记
    ctx.textAlign = 'left';
    ctx.fillText('O', centerX + 10, centerY + 20);
    
    // 坐标轴标签
    ctx.font = 'bold 16px Arial';
    ctx.fillText('x', canvas.width - 20, centerY + 20);
    ctx.fillText('y', centerX + 10, 20);
}

// 绘制一次函数图像
function drawLinearFunction() {
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    
    // 计算直线的起点和终点
    const x1 = -15;
    const y1 = k * x1 + b;
    const x2 = 15;
    const y2 = k * x2 + b;
    
    const canvasX1 = centerX + x1 * scale;
    const canvasY1 = centerY - y1 * scale;
    const canvasX2 = centerX + x2 * scale;
    const canvasY2 = centerY - y2 * scale;
    
    ctx.moveTo(canvasX1, canvasY1);
    ctx.lineTo(canvasX2, canvasY2);
    ctx.stroke();
}

// 绘制截距点
function drawInterceptPoint() {
    const canvasX = centerX;
    const canvasY = centerY - b * scale;
    
    // 绘制点
    ctx.fillStyle = '#f5576c';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // 绘制虚线到坐标轴
    ctx.strokeStyle = '#f5576c';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // 到x轴的虚线
    ctx.beginPath();
    ctx.moveTo(canvasX, canvasY);
    ctx.lineTo(canvasX, centerY);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // 标注坐标
    ctx.fillStyle = '#f5576c';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`(0, ${b})`, canvasX + 10, canvasY - 10);
}

// 绘制斜率示意图
function drawSlopeTriangle() {
    if (k === 0) return;
    
    // 选择一个合适的位置绘制示意三角形
    const startX = 2;
    const startY = k * startX + b;
    const endX = startX + 2;
    const endY = k * endX + b;
    
    const canvasX1 = centerX + startX * scale;
    const canvasY1 = centerY - startY * scale;
    const canvasX2 = centerX + endX * scale;
    const canvasY2 = centerY - endY * scale;
    const canvasX3 = canvasX2;
    const canvasY3 = canvasY1;
    
    // 绘制三角形
    ctx.strokeStyle = '#ff9800';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    
    // 水平线
    ctx.beginPath();
    ctx.moveTo(canvasX1, canvasY1);
    ctx.lineTo(canvasX3, canvasY3);
    ctx.stroke();
    
    // 垂直线
    ctx.beginPath();
    ctx.moveTo(canvasX3, canvasY3);
    ctx.lineTo(canvasX2, canvasY2);
    ctx.stroke();
    
    // 标注 Δx 和 Δy
    ctx.fillStyle = '#ff9800';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    
    // Δx
    ctx.fillText('Δx = 2', (canvasX1 + canvasX3) / 2, canvasY3 + 20);
    
    // Δy
    ctx.textAlign = 'right';
    const deltaY = k * 2;
    ctx.fillText(`Δy = ${deltaY.toFixed(1)}`, canvasX3 - 10, (canvasY2 + canvasY3) / 2);
    
    // 箭头指示方向
    if (k > 0) {
        drawArrow(ctx, canvasX2, canvasY3, canvasX2, canvasY2, '#ff9800');
    } else {
        drawArrow(ctx, canvasX2, canvasY2, canvasX2, canvasY3, '#ff9800');
    }
}

// 绘制箭头
function drawArrow(ctx, fromX, fromY, toX, toY, color) {
    const headLength = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    
    // 绘制箭头线
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // 绘制箭头头部
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
}

// 绘制鼠标位置的点
function drawMousePoint() {
    // 将画布坐标转换为数学坐标
    const mathX = (mouseX - centerX) / scale;
    const mathY = (centerY - mouseY) / scale;
    
    // 计算鼠标位置在直线上的最近点
    // 直线方程: y = kx + b
    // 点到直线的最短距离是垂线
    // 垂线斜率: -1/k (当k≠0)
    
    let nearestX, nearestY;
    
    if (k === 0) {
        nearestX = mathX;
        nearestY = b;
    } else {
        // 求垂线与原直线的交点
        // y = kx + b
        // y - mathY = -1/k * (x - mathX)
        // 解方程组
        nearestX = (mathX + k * mathY - k * b) / (k * k + 1);
        nearestY = k * nearestX + b;
    }
    
    const canvasNearestX = centerX + nearestX * scale;
    const canvasNearestY = centerY - nearestY * scale;
    
    // 计算鼠标到最近点的距离
    const distance = Math.sqrt(
        Math.pow(mouseX - canvasNearestX, 2) + 
        Math.pow(mouseY - canvasNearestY, 2)
    );
    
    // 如果鼠标距离直线足够近（20像素内），则显示该点
    if (distance < 20) {
        // 绘制点
        ctx.fillStyle = '#4caf50';
        ctx.beginPath();
        ctx.arc(canvasNearestX, canvasNearestY, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // 添加白色边框
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 显示坐标
        pointCoords.textContent = `(${nearestX.toFixed(2)}, ${nearestY.toFixed(2)})`;
        
        // 在点附近显示坐标标签
        ctx.fillStyle = '#4caf50';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        
        const labelX = canvasNearestX + 15;
        const labelY = canvasNearestY - 15;
        
        // 绘制背景
        const text = `(${nearestX.toFixed(1)}, ${nearestY.toFixed(1)})`;
        const metrics = ctx.measureText(text);
        const padding = 5;
        
        ctx.fillStyle = 'rgba(76, 175, 80, 0.9)';
        ctx.fillRect(
            labelX - padding, 
            labelY - 15, 
            metrics.width + padding * 2, 
            20
        );
        
        // 绘制文字
        ctx.fillStyle = '#fff';
        ctx.fillText(text, labelX, labelY);
        
    } else {
        pointCoords.textContent = '将鼠标移到直线上查看坐标';
    }
}

// 启动应用
init();
