    let barangList = JSON.parse(localStorage.getItem('barangList')) || [];

    function renderBarangList(filteredBarangList = barangList) {
        const tbody = document.getElementById('barangList');
        tbody.innerHTML = '';
        filteredBarangList.forEach((barang, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${barang.nama}</td>
                <td>Rp ${barang.harga}</td>
                <td>${barang.stok}</td>
                <td>
                    <a class="edit" onclick="editBarang(${index})">Edit</a>
                    <a class="delete" onclick="deleteBarang(${index})">Delete</a>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function tambahBarang() {
        const nama = document.getElementById('namaBarang').value.trim();
        const harga = document.getElementById('hargaBarang').value.trim();
        const stok = document.getElementById('stokBarang').value.trim();

        if (!nama || !harga || !stok) {
            alert("Nama, harga, dan stok barang harus diisi!");
            return;
        }

        barangList.push({ nama, harga, stok });
        localStorage.setItem('barangList', JSON.stringify(barangList));
        document.getElementById('namaBarang').value = '';
        document.getElementById('hargaBarang').value = '';
        document.getElementById('stokBarang').value = '';
        renderBarangList();
    }

    function editBarang(index) {
        const barang = barangList[index];
        const namaBaru = prompt("Edit Nama Barang:", barang.nama);
        const hargaBaru = prompt("Edit Harga Barang:", barang.harga);
        const stokBaru = prompt("Edit Stok Barang:", barang.stok);

        if (namaBaru !== null && hargaBaru !== null && stokBaru !== null) {
            barangList[index] = { 
                nama: namaBaru.trim(), 
                harga: hargaBaru.trim(), 
                stok: stokBaru.trim() 
            };
            localStorage.setItem('barangList', JSON.stringify(barangList));
            renderBarangList();
        }
    }

    function deleteBarang(index) {
        if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
            barangList.splice(index, 1);
            localStorage.setItem('barangList', JSON.stringify(barangList));
            renderBarangList();
        }
    }

    function searchBarang() {
        const searchQuery = document.getElementById('searchBarang').value.toLowerCase();
        const filteredBarangList = barangList.filter(barang =>
            barang.nama.toLowerCase().includes(searchQuery)
        );
        renderBarangList(filteredBarangList);
    }

    renderBarangList();