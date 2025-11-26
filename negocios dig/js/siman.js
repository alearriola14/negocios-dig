// Probador Virtual Siman - JavaScript
class SimanVirtualTryOn {
    constructor() {
        this.selectedItems = {
            superior: null,
            inferior: null,
            calzado: null,
            accesorio: null
        };
        this.currentGender = 'unisex';
        this.currentCategory = 'superior';
        this.isRealTimeMode = false;
        this.total = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderProducts();
        this.updateAvatar();
        this.updateSelectedItems();
        this.updateTotal();
        
        // Debug: verificar que todo esté funcionando
        console.log('SimanVirtualTryOn iniciado correctamente');
        console.log('Género actual:', this.currentGender);
        console.log('Categoría actual:', this.currentCategory);
        console.log('Base de datos de productos:', this.getProductDatabase());
    }

    setupEventListeners() {
        // Botones de género
        document.querySelectorAll('.gender-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeGender(e.target.textContent.toLowerCase()));
        });

        // Tabs de categorías
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.changeCategory(e.target.textContent.toLowerCase()));
        });

        // Botones de acción del header
        document.querySelector('.btn-action.red').addEventListener('click', () => this.uploadPhoto());
        document.querySelector('.btn-action.white').addEventListener('click', () => this.toggleRealTime());

        // Botones de acción inferior
        document.querySelectorAll('.bottom-actions .btn').forEach((btn, index) => {
            const actions = [this.saveLook, this.shareLook, this.captureLook, this.resetLook];
            btn.addEventListener('click', actions[index].bind(this));
        });
    }

    // Base de datos de productos
    getProductDatabase() {
        return {
            mujer: {
                superior: [
                    { id: 1, name: 'Blusa Floral', price: 45.99, color: '#ff69b4', image: 'blusa-floral.jpg' },
                    { id: 2, name: 'Camiseta Rosa', price: 29.99, color: '#ff1493', image: 'camiseta-rosa.jpg' },
                    { id: 3, name: 'Suéter Lila', price: 65.99, color: '#dda0dd', image: 'sueter-lila.jpg' },
                    { id: 4, name: 'Top Negro', price: 35.99, color: '#000000', image: 'top-negro.jpg' },
                    { id: 5, name: 'Blusa Turquesa', price: 42.99, color: '#40e0d0', image: 'blusa-turquesa.jpg' },
                    { id: 6, name: 'Camiseta Coral', price: 31.99, color: '#ff7f50', image: 'camiseta-coral.jpg' }
                ],
                inferior: [
                    { id: 7, name: 'Falda A-Line', price: 42.99, color: '#8b4513', image: 'falda-aline.jpg' },
                    { id: 8, name: 'Pantalón Skinny', price: 59.99, color: '#000080', image: 'pantalon-skinny.jpg' },
                    { id: 9, name: 'Shorts Denim', price: 38.99, color: '#4682b4', image: 'shorts-denim.jpg' },
                    { id: 10, name: 'Falda Plisada', price: 48.99, color: '#800080', image: 'falda-plisada.jpg' },
                    { id: 11, name: 'Leggings Negros', price: 35.99, color: '#000000', image: 'leggings-negros.jpg' }
                ],
                calzado: [
                    { id: 12, name: 'Tacones Rojos', price: 89.99, color: '#dc143c', image: 'tacones-rojos.jpg' },
                    { id: 13, name: 'Sneakers Rosas', price: 75.99, color: '#ff69b4', image: 'sneakers-rosas.jpg' },
                    { id: 14, name: 'Botas Marrones', price: 95.99, color: '#8b4513', image: 'botas-marrones.jpg' },
                    { id: 15, name: 'Sandalias Doradas', price: 65.99, color: '#ffd700', image: 'sandalias-doradas.jpg' }
                ],
                accesorio: [
                    { id: 16, name: 'Sombrero Plateado', price: 125.99, color: '#c0c0c0', image: 'sombrero-plateado.jpg' },
                    { id: 17, name: 'Reloj Dorado', price: 45.99, color: '#ffd700', image: 'reloj-dorado.jpg' },
                    { id: 18, name: 'Pulsera Rosada', price: 35.99, color: '#ff69b4', image: 'pulsera-rosada.jpg' },
                    { id: 19, name: 'Anillo Esmeralda', price: 89.99, color: '#50c878', image: 'anillo-esmeralda.jpg' },
                    { id: 20, name: 'Bufanda Azul', price: 28.99, color: '#4169e1', image: 'bufanda-azul.jpg' }
                ]
            },
            hombre: {
                superior: [
                    { id: 21, name: 'Camisa Azul', price: 49.99, color: '#000080', image: 'camisa-azul.jpg' },
                    { id: 22, name: 'Camiseta Negra', price: 25.99, color: '#000000', image: 'camiseta-negra.jpg' },
                    { id: 23, name: 'Polo Verde', price: 35.99, color: '#228b22', image: 'polo-verde.jpg' },
                    { id: 24, name: 'Suéter Gris', price: 65.99, color: '#808080', image: 'sueter-gris.jpg' },
                    { id: 25, name: 'Camisa Roja', price: 52.99, color: '#dc143c', image: 'camisa-roja.jpg' },
                    { id: 26, name: 'Camiseta Azul Marino', price: 28.99, color: '#191970', image: 'camiseta-azul-marino.jpg' }
                ],
                inferior: [
                    { id: 27, name: 'Jeans Azules', price: 69.99, color: '#4682b4', image: 'jeans-azules.jpg' },
                    { id: 28, name: 'Pantalón Negro', price: 79.99, color: '#000000', image: 'pantalon-negro.jpg' },
                    { id: 29, name: 'Shorts Caqui', price: 45.99, color: '#f0e68c', image: 'shorts-caqui.jpg' },
                    { id: 30, name: 'Pantalón Marrón', price: 72.99, color: '#8b4513', image: 'pantalon-marron.jpg' },
                    { id: 31, name: 'Jeans Oscuros', price: 75.99, color: '#2f4f4f', image: 'jeans-oscuros.jpg' }
                ],
                calzado: [
                    { id: 32, name: 'Zapatos Formales', price: 120.99, color: '#000000', image: 'zapatos-formales.jpg' },
                    { id: 33, name: 'Sneakers Azules', price: 95.99, color: '#4169e1', image: 'sneakers-azules.jpg' },
                    { id: 34, name: 'Botas Negras', price: 135.99, color: '#000000', image: 'botas-negras.jpg' },
                    { id: 35, name: 'Zapatos Marrones', price: 115.99, color: '#8b4513', image: 'zapatos-marrones.jpg' }
                ],
                accesorio: [
                    { id: 36, name: 'Reloj Plateado', price: 150.99, color: '#c0c0c0', image: 'reloj-plateado.jpg' },
                    { id: 37, name: 'Gorra Negra', price: 29.99, color: '#000000', image: 'gorra-negra.jpg' },
                    { id: 38, name: 'Cinturón Marrón', price: 45.99, color: '#8b4513', image: 'cinturon-marron.jpg' },
                    { id: 39, name: 'Reloj Dorado', price: 175.99, color: '#ffd700', image: 'reloj-dorado.jpg' },
                    { id: 40, name: 'Gafas Negras', price: 85.99, color: '#000000', image: 'gafas-negras.jpg' }
                ]
            },
            unisex: {
                superior: [
                    { id: 41, name: 'Camiseta Gris Básica', price: 29.99, color: '#808080', image: 'basic-gray.jpg' },
                    { id: 42, name: 'Suéter Verde', price: 49.99, color: '#228b22', image: 'green-sweater.jpg' },
                    { id: 43, name: 'Camiseta Negra', price: 34.99, color: '#000000', image: 'black-tee.jpg' },
                    { id: 44, name: 'Hoodie Azul', price: 59.99, color: '#000080', image: 'blue-hoodie.jpg' },
                    { id: 45, name: 'Polo Rojo', price: 42.99, color: '#dc143c', image: 'red-polo.jpg' },
                    { id: 46, name: 'Camiseta Amarilla', price: 31.99, color: '#ffd700', image: 'yellow-tee.jpg' }
                ],
                inferior: [
                    { id: 47, name: 'Jeans Clásicos', price: 65.99, color: '#4682b4', image: 'classic-jeans.jpg' },
                    { id: 48, name: 'Pantalón Negro', price: 59.99, color: '#000000', image: 'black-pants.jpg' },
                    { id: 49, name: 'Shorts Grises', price: 38.99, color: '#696969', image: 'gray-shorts.jpg' },
                    { id: 50, name: 'Pantalón Caqui', price: 55.99, color: '#f0e68c', image: 'khaki-pants.jpg' }
                ],
                calzado: [
                    { id: 51, name: 'Sneakers Negros', price: 85.99, color: '#000000', image: 'black-sneakers.jpg' },
                    { id: 52, name: 'Converse Rojos', price: 75.99, color: '#dc143c', image: 'red-converse.jpg' },
                    { id: 53, name: 'Zapatos Grises', price: 92.99, color: '#808080', image: 'gray-shoes.jpg' }
                ],
                accesorio: [
                    { id: 54, name: 'Gorra Azul', price: 25.99, color: '#000080', image: 'blue-cap.jpg' },
                    { id: 55, name: 'Reloj Digital', price: 89.99, color: '#000000', image: 'digital-watch.jpg' },
                    { id: 56, name: 'Reloj Gris', price: 65.99, color: '#696969', image: 'reloj-gris.jpg' },
                    { id: 57, name: 'Gafas Deportivas', price: 55.99, color: '#ff4500', image: 'sport-glasses.jpg' }
                ]
            }
        };
    }

    changeGender(gender) {
        this.currentGender = gender;
        
        // Actualizar botones activos
        document.querySelectorAll('.gender-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase() === gender) {
                btn.classList.add('active');
            }
        });

        // Limpiar selecciones anteriores
        this.selectedItems = {
            superior: null,
            inferior: null,
            calzado: null,
            accesorio: null
        };

        this.renderProducts();
        this.updateAvatar();
        this.updateSelectedItems();
        this.updateTotal();
    }

    changeCategory(category) {
        // Normalizar la categoría para que coincida con la base de datos
        const normalizedCategory = category === 'accesorios' ? 'accesorio' : category;
        this.currentCategory = normalizedCategory;

        // Actualizar tabs activos
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.textContent.toLowerCase() === category) {
                tab.classList.add('active');
            }
        });

        this.renderProducts();
    }

    renderProducts() {
        const gallery = document.querySelector('.product-gallery');
        const db = this.getProductDatabase();
        
        let products = [];
        
        console.log('Renderizando productos para:', {
            gender: this.currentGender, 
            category: this.currentCategory,
            availableCategories: db[this.currentGender] ? Object.keys(db[this.currentGender]) : 'No disponible'
        });
        
        if (this.currentGender === 'unisex') {
            // Para unisex, obtener productos de la categoría específica
            products = db.unisex[this.currentCategory] || [];
        } else {
            products = db[this.currentGender][this.currentCategory] || [];
        }

        console.log('Productos encontrados:', products.length, products);

        gallery.innerHTML = '';

        if (products.length === 0) {
            gallery.innerHTML = '<p>No hay productos disponibles en esta categoría</p>';
            return;
        }

        products.forEach(product => {
            const productCard = this.createProductCard(product);
            gallery.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="wishlist-icon">♡</span>
            <div class="product-image" style="background-image: url('img/${product.image}')">
                <span style="background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px; display: none;">Sin imagen</span>
            </div>
            <p class="product-name">${product.name}</p>
            <p class="product-price">$${product.price}</p>
            <button class="btn btn-select" data-product='${JSON.stringify(product)}'>
                Seleccionar
            </button>
        `;

        // Agregar event listener para selección
        card.querySelector('.btn-select').addEventListener('click', () => {
            this.selectProduct(product);
        });

        // Manejar error de carga de imagen
        const productImage = card.querySelector('.product-image');
        const errorSpan = productImage.querySelector('span');
        const img = new Image();
        img.onload = function() {
            // Imagen cargada correctamente
            errorSpan.style.display = 'none';
        };
        img.onerror = function() {
            // Error al cargar imagen, mostrar color de fondo y mensaje
            productImage.style.backgroundImage = 'none';
            productImage.style.backgroundColor = product.color;
            errorSpan.style.display = 'block';
        };
        img.src = `img/${product.image}`;

        return card;
    }

    selectProduct(product) {
        // Determinar la categoría del producto basándose en la categoría actual
        let category = this.currentCategory;
        
        // Para unisex, usar la categoría actualmente seleccionada
        if (this.currentGender === 'unisex') {
            // Verificar si estamos en una categoría válida
            if (!['superior', 'inferior', 'calzado', 'accesorio'].includes(this.currentCategory)) {
                category = 'superior';
            }
        }

        this.selectedItems[category] = product;
        this.updateAvatar();
        this.updateSelectedItems();
        this.updateTotal();
        
        // Mostrar notificación
        this.showNotification(`${product.name} agregado al look`);
    }

    updateAvatar() {
        const avatar = document.querySelector('.avatar-placeholder');
        const avatarDisplay = document.querySelector('.avatar-display');
        
        // Limpiar estilos anteriores
        avatar.style.background = '';
        
        // Limpiar accesorios existentes
        const existingAccessory = avatarDisplay.querySelector('.avatar-accessory');
        if (existingAccessory) {
            existingAccessory.remove();
        }
        
        // Crear gradiente más realista para el torso (superior e inferior)
        let torsoGradient = '';
        
        if (this.selectedItems.superior && this.selectedItems.inferior) {
            // Ambas prendas seleccionadas - superior en torso, inferior en piernas
            torsoGradient = `linear-gradient(to bottom, 
                ${this.selectedItems.superior.color} 0%, 
                ${this.selectedItems.superior.color} 100%)`;
                
            // Actualizar color de piernas separadamente
            this.updateLegColor(this.selectedItems.inferior.color);
        } else if (this.selectedItems.superior) {
            // Solo prenda superior - mostrar en el torso
            torsoGradient = `linear-gradient(to bottom, 
                ${this.selectedItems.superior.color} 0%, 
                ${this.selectedItems.superior.color} 100%)`;
            this.updateLegColor('#e0e0e0'); // Color por defecto para piernas
        } else if (this.selectedItems.inferior) {
            // Solo prenda inferior - mostrar en piernas
            torsoGradient = 'linear-gradient(to bottom, #f5f5f5 0%, #f5f5f5 100%)';
            this.updateLegColor(this.selectedItems.inferior.color);
        } else {
            // Sin prendas - colores base
            torsoGradient = 'linear-gradient(to bottom, #f5f5f5 0%, #f5f5f5 100%)';
            this.updateLegColor('#e0e0e0');
        }
        
        avatar.style.background = torsoGradient;
        
        // Actualizar color de los pies según el calzado seleccionado
        this.updateShoeColor();
        
        // Aplicar sombra general
        avatar.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        
        // Mostrar accesorios
        if (this.selectedItems.accesorio) {
            this.showAccessory(this.selectedItems.accesorio);
        }
    }

    updateLegColor(color) {
        // Crear estilo para actualizar color de piernas y zapatos de una vez
        let existingLegStyle = document.querySelector('#leg-color-style');
        if (existingLegStyle) {
            existingLegStyle.remove();
        }
        
        let existingShoeStyle = document.querySelector('#shoe-color-style');
        if (existingShoeStyle) {
            existingShoeStyle.remove();
        }
        
        const style = document.createElement('style');
        style.id = 'leg-color-style';
        
        const shoeColor = this.selectedItems.calzado ? this.selectedItems.calzado.color : '#333333';
        
        style.textContent = `
            .avatar-display::before {
                background: linear-gradient(to bottom, 
                    ${color} 0%, 
                    ${color} 70%, 
                    ${shoeColor} 70%, 
                    ${shoeColor} 100%) !important;
            }
        `;
        
        document.head.appendChild(style);
        
        console.log('Actualizando piernas:', color, 'zapatos:', shoeColor);
    }

    updateSelectedItems() {
        const slots = document.querySelectorAll('.slot');
        const categories = ['superior', 'inferior', 'calzado', 'accesorio'];
        
        slots.forEach((slot, index) => {
            const category = categories[index];
            const item = this.selectedItems[category];
            
            if (item) {
                slot.innerHTML = `
                    <div class="selected-item">
                        <div class="item-preview" style="background-image: url('img/${item.image}'); background-size: cover; background-position: center; background-color: ${item.color}"></div>
                        <span>${item.name}</span>
                        <button class="btn-remove" data-category="${category}">×</button>
                    </div>
                `;
                slot.classList.add('has-item');
                
                // Agregar evento para remover
                slot.querySelector('.btn-remove').addEventListener('click', () => {
                    this.removeItem(category);
                });
            } else {
                slot.innerHTML = category.charAt(0).toUpperCase() + category.slice(1);
                slot.classList.remove('has-item');
            }
        });
    }

    removeItem(category) {
        this.selectedItems[category] = null;
        this.updateAvatar();
        this.updateSelectedItems();
        this.updateTotal();
    }

    updateTotal() {
        this.total = Object.values(this.selectedItems)
            .filter(item => item !== null)
            .reduce((sum, item) => sum + item.price, 0);
        
        // Crear o actualizar el display del total
        let totalDisplay = document.querySelector('.total-display');
        if (!totalDisplay) {
            totalDisplay = document.createElement('div');
            totalDisplay.className = 'total-display';
            document.querySelector('.selected-items').appendChild(totalDisplay);
        }
        
        totalDisplay.innerHTML = `
            <div class="total-section">
                <h3>Total: $${this.total.toFixed(2)}</h3>
            </div>
        `;
    }

    // Funciones de botones de acción
    uploadPhoto() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const avatar = document.querySelector('.avatar-placeholder');
                    avatar.style.backgroundImage = `url(${e.target.result})`;
                    avatar.style.backgroundSize = 'cover';
                    avatar.style.backgroundPosition = 'center';
                };
                reader.readAsDataURL(file);
                this.showNotification('Foto cargada exitosamente');
            }
        });
        input.click();
    }

    toggleRealTime() {
        this.isRealTimeMode = !this.isRealTimeMode;
        const avatarDisplay = document.querySelector('.avatar-display');
        const tag = document.querySelector('.tag');
        
        if (this.isRealTimeMode) {
            // Crear elemento de video
            avatarDisplay.innerHTML = `
                <video class="real-time-video" autoplay muted>
                    Tu navegador no soporta video.
                </video>
            `;
            tag.textContent = 'Tiempo Real';
            
            // Intentar acceder a la cámara
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    document.querySelector('.real-time-video').srcObject = stream;
                })
                .catch(() => {
                    this.showNotification('No se pudo acceder a la cámara');
                    this.toggleRealTime(); // Volver al modo foto
                });
        } else {
            avatarDisplay.innerHTML = `
                <div class="avatar-placeholder"></div>
            `;
            tag.textContent = 'Modo Foto';
            this.updateAvatar();
        }
    }

    saveLook() {
        const lookData = {
            timestamp: new Date().toISOString(),
            gender: this.currentGender,
            items: this.selectedItems,
            total: this.total
        };
        
        // Guardar en localStorage
        const savedLooks = JSON.parse(localStorage.getItem('simanLooks') || '[]');
        savedLooks.push(lookData);
        localStorage.setItem('simanLooks', JSON.stringify(savedLooks));
        
        this.showNotification('Look guardado exitosamente', 'success');
    }

    shareLook() {
        const lookDescription = Object.values(this.selectedItems)
            .filter(item => item)
            .map(item => item.name)
            .join(', ');
        
        if (navigator.share) {
            navigator.share({
                title: 'Mi Look de Siman',
                text: `Mira mi look: ${lookDescription} - Total: $${this.total.toFixed(2)}`,
                url: window.location.href
            });
        } else {
            // Fallback para navegadores que no soportan Web Share API
            navigator.clipboard.writeText(`Mira mi look: ${lookDescription} - Total: $${this.total.toFixed(2)}`);
            this.showNotification('Link copiado al portapapeles');
        }
    }

    captureLook() {
        const avatar = document.querySelector('.avatar-display');
        
        // Usar html2canvas para capturar la imagen (necesitaría ser agregada como dependencia)
        // Por simplicidad, simularemos la captura
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 400;
        
        // Dibujar fondo
        ctx.fillStyle = '#fcf6f3';
        ctx.fillRect(0, 0, 300, 400);
        
        // Simular avatar con colores seleccionados
        if (this.selectedItems.superior) {
            ctx.fillStyle = this.selectedItems.superior.color;
            ctx.fillRect(50, 50, 200, 150);
        }
        
        if (this.selectedItems.inferior) {
            ctx.fillStyle = this.selectedItems.inferior.color;
            ctx.fillRect(50, 200, 200, 150);
        }
        
        // Descargar imagen
        const link = document.createElement('a');
        link.download = `siman-look-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        this.showNotification('Captura descargada');
    }

    resetLook() {
        if (confirm('¿Estás seguro de que quieres reiniciar el look?')) {
            this.selectedItems = {
                superior: null,
                inferior: null,
                calzado: null,
                accesorio: null
            };
            
            this.updateAvatar();
            this.updateSelectedItems();
            this.updateTotal();
            this.showNotification('Look reiniciado');
        }
    }

    updateShoeColor() {
        // Esta función ahora es manejada por updateLegColor
        // Llamamos updateLegColor con el color actual de las piernas
        const currentLegColor = this.selectedItems.inferior ? this.selectedItems.inferior.color : '#e0e0e0';
        this.updateLegColor(currentLegColor);
    }
    
    showAccessory(accessory) {
        const avatarDisplay = document.querySelector('.avatar-display');
        const accessoryElement = document.createElement('div');
        accessoryElement.className = 'avatar-accessory';
        accessoryElement.style.position = 'absolute';
        accessoryElement.style.backgroundColor = accessory.color;
        accessoryElement.style.border = '2px solid #fff';
        accessoryElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        
        // Crear ícono/texto del accesorio
        const accessoryIcon = document.createElement('span');
        accessoryIcon.style.position = 'absolute';
        accessoryIcon.style.top = '50%';
        accessoryIcon.style.left = '50%';
        accessoryIcon.style.transform = 'translate(-50%, -50%)';
        accessoryIcon.style.fontWeight = 'bold';
        accessoryIcon.style.textAlign = 'center';
        accessoryIcon.style.lineHeight = '1';
        
        // Configuración específica por accesorio según tus requerimientos
        const accessoryName = accessory.name.toLowerCase();
        
        // MUJER
        if (accessoryName === 'sombrero plateado') {
            // A la misma altura que la bufanda
            accessoryElement.style.top = '8%';
            accessoryElement.style.left = '50%';
            accessoryElement.style.transform = 'translateX(-50%)';
            accessoryElement.style.width = '60px';
            accessoryElement.style.height = '25px';
            accessoryElement.style.borderRadius = '30px 30px 15px 15px';
            accessoryIcon.style.fontSize = '16px';
            accessoryIcon.style.color = '#333';
            accessoryIcon.textContent = '👒';
            
        } else if (accessoryName === 'pulsera rosada') {
            // Pegada al brazo izquierdo (muñeca)
            accessoryElement.style.top = '35%';
            accessoryElement.style.left = '75%';
            accessoryElement.style.width = '18px';
            accessoryElement.style.height = '18px';
            accessoryElement.style.borderRadius = '50%';
            accessoryIcon.style.fontSize = '12px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '💎';
            
        } else if (accessoryName === 'anillo esmeralda') {
            // Pegado al brazo izquierdo (muñeca) pero más pequeño
            accessoryElement.style.top = '45%';
            accessoryElement.style.left = '78%';
            accessoryElement.style.width = '12px';
            accessoryElement.style.height = '12px';
            accessoryElement.style.borderRadius = '50%';
            accessoryIcon.style.fontSize = '10px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '💍';
            
        } else if (accessoryName === 'reloj dorado') {
            // Pegado al brazo izquierdo (muñeca)
            accessoryElement.style.top = '40%';
            accessoryElement.style.left = '75%';
            accessoryElement.style.width = '20px';
            accessoryElement.style.height = '20px';
            accessoryElement.style.borderRadius = '50%';
            accessoryIcon.style.fontSize = '12px';
            accessoryIcon.style.color = '#333';
            accessoryIcon.textContent = '⌚';
            
        } else if (accessoryName === 'bufanda azul') {
            // Cuello del avatar
            accessoryElement.style.top = '8%';
            accessoryElement.style.left = '50%';
            accessoryElement.style.transform = 'translateX(-50%)';
            accessoryElement.style.width = '70px';
            accessoryElement.style.height = '12px';
            accessoryElement.style.borderRadius = '6px';
            accessoryIcon.style.fontSize = '14px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '🧣';
            
        // HOMBRE
        } else if (accessoryName === 'gorra negra') {
            // A la misma altura que la bufanda
            accessoryElement.style.top = '8%';
            accessoryElement.style.left = '50%';
            accessoryElement.style.transform = 'translateX(-50%)';
            accessoryElement.style.width = '55px';
            accessoryElement.style.height = '25px';
            accessoryElement.style.borderRadius = '25px 25px 10px 10px';
            accessoryIcon.style.fontSize = '16px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '🧢';
            
        } else if (accessoryName === 'cinturón marrón') {
            // Medio del cuerpo del avatar
            accessoryElement.style.top = '50%';
            accessoryElement.style.left = '50%';
            accessoryElement.style.transform = 'translateX(-50%)';
            accessoryElement.style.width = '80px';
            accessoryElement.style.height = '8px';
            accessoryElement.style.borderRadius = '4px';
            accessoryIcon.style.fontSize = '12px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '🔗';
            
        } else if (accessoryName === 'gafas negras') {
            // A la misma altura que la bufanda
            accessoryElement.style.top = '8%';
            accessoryElement.style.left = '50%';
            accessoryElement.style.transform = 'translateX(-50%)';
            accessoryElement.style.width = '45px';
            accessoryElement.style.height = '15px';
            accessoryElement.style.borderRadius = '8px';
            accessoryIcon.style.fontSize = '14px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '🕶️';
            
        } else if (accessoryName === 'reloj plateado') {
            // Pegado al brazo izquierdo (muñeca)
            accessoryElement.style.top = '40%';
            accessoryElement.style.left = '75%';
            accessoryElement.style.width = '20px';
            accessoryElement.style.height = '20px';
            accessoryElement.style.borderRadius = '50%';
            accessoryIcon.style.fontSize = '12px';
            accessoryIcon.style.color = '#333';
            accessoryIcon.textContent = '⌚';
            
        // UNISEX
        } else if (accessoryName === 'gorra azul') {
            // A la misma altura que la bufanda
            accessoryElement.style.top = '8%';
            accessoryElement.style.left = '50%';
            accessoryElement.style.transform = 'translateX(-50%)';
            accessoryElement.style.width = '55px';
            accessoryElement.style.height = '25px';
            accessoryElement.style.borderRadius = '25px 25px 10px 10px';
            accessoryIcon.style.fontSize = '16px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '🧢';
            
        } else if (accessoryName === 'gafas deportivas') {
            // A la misma altura que la bufanda
            accessoryElement.style.top = '8%';
            accessoryElement.style.left = '50%';
            accessoryElement.style.transform = 'translateX(-50%)';
            accessoryElement.style.width = '45px';
            accessoryElement.style.height = '15px';
            accessoryElement.style.borderRadius = '8px';
            accessoryIcon.style.fontSize = '14px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '🥽';
            
        } else if (accessoryName === 'reloj digital') {
            // Pegado al brazo izquierdo (muñeca)
            accessoryElement.style.top = '40%';
            accessoryElement.style.left = '75%';
            accessoryElement.style.width = '20px';
            accessoryElement.style.height = '20px';
            accessoryElement.style.borderRadius = '4px';
            accessoryIcon.style.fontSize = '12px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '📱';
            
        } else if (accessoryName === 'reloj gris') {
            // Pegado al brazo izquierdo (muñeca)
            accessoryElement.style.top = '40%';
            accessoryElement.style.left = '75%';
            accessoryElement.style.width = '20px';
            accessoryElement.style.height = '20px';
            accessoryElement.style.borderRadius = '50%';
            accessoryIcon.style.fontSize = '12px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '⌚';
            
        } else {
            // Accesorio genérico - posición por defecto
            accessoryElement.style.top = '20%';
            accessoryElement.style.left = '50%';
            accessoryElement.style.transform = 'translateX(-50%)';
            accessoryElement.style.width = '30px';
            accessoryElement.style.height = '30px';
            accessoryElement.style.borderRadius = '50%';
            accessoryIcon.style.fontSize = '14px';
            accessoryIcon.style.color = '#fff';
            accessoryIcon.textContent = '✨';
        }
        
        accessoryElement.appendChild(accessoryIcon);
        avatarDisplay.appendChild(accessoryElement);
    }

    showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Mostrar animación
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SimanVirtualTryOn();
});